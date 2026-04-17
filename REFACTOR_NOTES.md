# Refactor Notes

## Scope
- Preserved existing public and portal visual design while hardening structure and runtime behavior.
- Focused on typed data layer, API validation, portal route protection, and routing consistency.

## Assumptions
- No visual redesign was permitted; class names and component markup were kept intact wherever possible.
- Portal auth is environment-driven in production and developer fallback is allowed in non-production.
- Existing static content is authoritative, so data normalization must not alter page copy.

## Key Structural Changes
- Added shared type modules under `types/` and aligned `data/*` files to consume them.
- Added centralized constants and schema validation helpers under `lib/`.
- Added proxy gate for `/portal/*` routes with login redirect and session cookie check.
- Added portal login API endpoint that sets an `HttpOnly` session cookie.
- Added missing project detail route to satisfy existing `/projects/[slug]` links.
- Added baseline security headers in Next config.

## Environment Variables
- `NEXT_PUBLIC_SITE_URL`
- `PORTAL_LOGIN_EMAIL`
- `PORTAL_LOGIN_PASSWORD`

## Validation and Build
- `npx tsc --noEmit`
- `npm run build`
