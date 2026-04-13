import Image from 'next/image'
import Link from 'next/link'

import { projects } from '@/lib/home-data'

export default function Projects() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section heading — left-aligned, serif italic-style */}
        <div className="mb-10">
          <h2 className="font-serif text-3xl md:text-4xl text-black">
            Precision In-Situ.
          </h2>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-5">
          {projects.map((project) => (
            <Link href={project.href} key={project.href} className="group block">
              {/* Image container — fixed aspect ratio, clipped */}
              <div className="relative w-full overflow-hidden bg-gray-100 aspect-[4/3]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Meta */}
              <div className="pt-4">
                <p className="font-sans text-[10px] tracking-[0.18em] text-gray-400 uppercase mb-1">
                  {project.category}
                </p>
                <h3 className="font-sans text-sm font-medium text-black tracking-tight">
                  {project.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
