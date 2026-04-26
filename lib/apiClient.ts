const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const API_PREFIX = '/api/v1';
const ACCESS_TOKEN_KEY = 'access_token';

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

function getToken(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.localStorage.getItem(ACCESS_TOKEN_KEY);
}

function clearTokenAndRedirectToLogin(): void {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.location.href = '/login';
}

function buildUrl(path: string): string {
  if (!API_BASE_URL) {
    throw new Error('Missing NEXT_PUBLIC_API_URL environment variable.');
  }

  const base = API_BASE_URL.replace(/\/$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const hasApiPrefix = base.endsWith(API_PREFIX);
  const withVersionedPrefix = hasApiPrefix
    ? normalizedPath
    : `${API_PREFIX}${normalizedPath}`;

  return `${base}${withVersionedPrefix}`;
}

async function parseErrorMessage(response: Response): Promise<string> {
  try {
    const data = await response.json();

    if (typeof data?.message === 'string') {
      return data.message;
    }

    if (Array.isArray(data?.message)) {
      return data.message.join(', ');
    }

    if (typeof data?.error === 'string') {
      return data.error;
    }
  } catch {
    // Ignore parsing errors and fall back to status text.
  }

  return response.statusText || 'Request failed';
}

async function request<TResponse, TBody = unknown>(
  method: HttpMethod,
  path: string,
  body?: TBody,
): Promise<TResponse> {
  const token = getToken();

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(buildUrl(path), {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (response.status === 401) {
    clearTokenAndRedirectToLogin();
    throw new Error('Unauthorized');
  }

  if (!response.ok) {
    const message = await parseErrorMessage(response);
    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as TResponse;
  }

  return (await response.json()) as TResponse;
}

export const apiClient = {
  get<TResponse>(path: string): Promise<TResponse> {
    return request<TResponse>('GET', path);
  },

  post<TResponse, TBody = unknown>(path: string, body: TBody): Promise<TResponse> {
    return request<TResponse, TBody>('POST', path, body);
  },

  patch<TResponse, TBody = unknown>(path: string, body: TBody): Promise<TResponse> {
    return request<TResponse, TBody>('PATCH', path, body);
  },

  delete<TResponse>(path: string): Promise<TResponse> {
    return request<TResponse>('DELETE', path);
  },
};
