import Link from 'next/link'

export default function ArabicHomePage() {
  return (
    <main className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/ar" className="flex items-center gap-2 shrink-0">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="1" y="1" width="18" height="18" rx="2" stroke="#000" strokeWidth="2" />
              <path d="M6 10h8M10 6v8" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="font-sans font-semibold text-xs tracking-[0.15em] text-black uppercase">GASTROSPECS</span>
          </Link>

          <nav className="hidden md:flex items-center gap-7">
            {[
              { label: 'الكتالوج', href: '/ar/catalog' },
              { label: 'الخدمات', href: '/ar/services' },
              { label: 'المشاريع', href: '/ar/projects' },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="font-sans text-xs text-black hover:text-gray-500 transition-colors">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <Link href="/" className="flex items-center gap-1 text-xs text-black hover:text-gray-500 transition-colors">
              <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.4" />
                <ellipse cx="9" cy="9" rx="3.5" ry="8" stroke="currentColor" strokeWidth="1.4" />
                <line x1="1" y1="9" x2="17" y2="9" stroke="currentColor" strokeWidth="1.2" />
              </svg>
              <span>English</span>
            </Link>
            <Link href="/portal/login" className="hidden md:block text-xs text-black hover:text-gray-500 transition-colors">
              دخول الموظفين
            </Link>
            <Link href="/contact" className="bg-black text-white font-sans text-xs font-medium px-4 py-2 tracking-wide hover:bg-gray-800 transition-colors">
              طلب عرض سعر
            </Link>
          </div>
        </div>
      </header>

      <section className="bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_1fr] min-h-[580px]">
            <div className="relative bg-[#e8e8e8] min-h-[380px] lg:min-h-full flex items-center justify-center order-2 lg:order-1">
              <div className="w-3/4 h-3/4 bg-gray-400 rounded opacity-40" />
            </div>

            <div className="flex flex-col justify-center px-6 py-16 lg:py-20 lg:pl-16 xl:pl-24 order-1 lg:order-2 text-right">
              <div className="mb-7">
                <span className="inline-block border border-black text-black font-sans text-[10px] font-medium tracking-[0.2em] uppercase px-2.5 py-1">
                  معدات احترافية
                </span>
              </div>

              <h1 className="font-serif text-[2.6rem] md:text-5xl lg:text-[3.2rem] leading-[1.2] text-black mb-5">
                نصمم<br />
                <em className="italic text-gray-400">المستقبل</em><br />
                للطهي الاحترافي.
              </h1>

              <p className="font-sans text-sm text-gray-500 leading-relaxed mb-9 max-w-sm mr-auto ml-0">
                نوفر معدات المطابخ التجارية وتصميم حلول هندسية لأكثر بيئات العمل الكولينارية تطلبًا في العالم.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-end">
                <Link href="/ar/catalog" className="bg-black text-white font-sans text-xs font-medium tracking-wide px-7 py-3 text-center hover:bg-gray-800 transition-colors">
                  تصفح الكتالوج
                </Link>
                <Link href="/ar/services" className="border border-black text-black font-sans text-xs font-medium tracking-wide px-7 py-3 text-center hover:bg-gray-50 transition-colors">
                  تعرف أكثر
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-3 divide-x divide-gray-200">
            {[
              { value: '١٥', label: 'دولة' },
              { value: '٢٤/٧', label: 'دعم فني' },
              { value: '٥٠٠٠+', label: 'قطعة مصدّرة' },
            ].map((stat) => (
              <div key={stat.label} className="py-8 px-8 text-center">
                <p className="font-serif text-3xl font-bold text-black mb-1">{stat.value}</p>
                <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl text-black italic mb-3">خبراتنا الهندسية</h2>
          <p className="font-sans text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
            نحن لسنا مجرد موردين لمعدات المطابخ. نصمم حلولًا متكاملة تجمع بين الكفاءة الإنتاجية والعمالة الفنية المتقنة.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { number: '٠١', title: 'التوريد الاستراتيجي', desc: 'شراكات مباشرة مع المصانع العالمية بأسعار تنافسية.' },
            { number: '٠٢', title: 'تصميم المطابخ', desc: 'مخططات CAD و BIM لتحقيق أقصى كفاءة في كل مطبخ.' },
            { number: '٠٣', title: 'اللوجستيات العالمية', desc: 'التوصيل حتى الباب مع تخليص جمركي شامل.' },
          ].map((item) => (
            <div key={item.number} className="border-t-2 border-black pt-6">
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-300 mb-3">{item.number}</p>
              <h3 className="font-sans font-semibold text-sm text-black mb-3">{item.title}</h3>
              <p className="font-sans text-xs text-gray-500 leading-relaxed mb-5">{item.desc}</p>
              <Link href="/ar/services" className="font-sans text-[10px] tracking-[0.1em] uppercase text-gray-400 hover:text-black transition-colors flex items-center gap-1 justify-end">
                تعرف أكثر ←
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-black">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-white italic mb-4">
            بمعايير هل أنت جاهز للارتقاء مطبخك؟
          </h2>
          <p className="font-sans text-sm text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
            فريقنا الهندسي في انتظارك لتقديم عرض سعر مخصص لمتطلباتك التجارية.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="border border-white text-white font-sans text-xs tracking-[0.15em] uppercase px-8 py-3 hover:bg-white hover:text-black transition-colors">
              طلب عرض سعر
            </Link>
            <Link href="https://wa.me/1234567890" className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center hover:bg-green-500 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-black text-white border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center gap-2 mb-4 justify-end">
                <span className="font-sans font-semibold text-xs tracking-[0.15em] uppercase">GASTROSPECS</span>
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <rect x="1" y="1" width="18" height="18" rx="2" stroke="#fff" strokeWidth="2" />
                  <path d="M6 10h8M10 6v8" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <p className="font-sans text-xs text-gray-400 leading-relaxed text-right">
                قادة عالميون في توريد وهندسة المطابخ التجارية.
              </p>
            </div>
            {[
              { title: 'الكتالوج', items: ['الطهي الثقيل', 'التبريد', 'تحضير الطعام', 'الغسيل'] },
              { title: 'الخدمات', items: ['تصميم المطابخ', 'التوريد', 'اللوجستيات', 'ما بعد البيع'] },
              { title: 'النشرة الإخبارية', items: [] },
            ].map((col) => (
              <div key={col.title} className="text-right">
                <h4 className="font-sans text-[10px] font-semibold tracking-[0.2em] uppercase text-white mb-5">{col.title}</h4>
                {col.items.length > 0 ? (
                  <ul className="space-y-3">
                    {col.items.map((item) => (
                      <li key={item}>
                        <a href="#" className="font-sans text-xs text-gray-400 hover:text-white transition-colors">{item}</a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div>
                    <p className="font-sans text-xs text-gray-400 mb-3 leading-relaxed">ابق على اطلاع بآخر اتجاهات الصناعة.</p>
                    <form className="flex flex-row-reverse">
                      <input type="email" placeholder="البريد الإلكتروني" className="flex-1 bg-transparent border border-gray-700 font-sans text-xs text-white placeholder-gray-600 px-3 py-2.5 focus:outline-none" />
                      <button type="submit" className="bg-white text-black px-3.5 py-2.5 font-sans text-sm font-medium hover:bg-gray-200 transition-colors">←</button>
                    </form>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <p className="font-sans text-[10px] text-gray-600 tracking-wide">© 2024 GASTROSPECS. WORLDWIDE COVERAGE.</p>
            <div className="flex items-center gap-5">
              {['سياسة الخصوصية', 'شروط الخدمة', 'سياسة ملفات تعريف الارتباط'].map((item) => (
                <a key={item} href="#" className="font-sans text-[10px] text-gray-600 hover:text-gray-400 transition-colors">{item}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
