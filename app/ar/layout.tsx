import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'غاسترو سبكس | هندسة المطابخ التجارية',
  description: 'شركة متخصصة في التوريد العالمي لمعدات المطابخ التجارية والجزارة. نوصل إلى أي مكان في العالم.',
}

export default function ArabicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div dir="rtl" lang="ar" className="font-sans">
      {children}
    </div>
  )
}
