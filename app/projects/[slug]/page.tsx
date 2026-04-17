import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { getProjectBySlug, projects } from '@/data/projects'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    return {
      title: 'Project Not Found | GastroSpecs',
    }
  }

  return {
    title: `${project.title} | GastroSpecs Projects`,
    description: project.description,
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const relatedProjects = projects.filter((item) => item.slug !== project.slug).slice(0, 3)

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-4">
        <nav className="flex items-center gap-2 font-sans text-[10px] uppercase tracking-wide text-gray-400">
          <Link href="/" className="transition-colors hover:text-black">
            Home
          </Link>
          <span>/</span>
          <Link href="/projects" className="transition-colors hover:text-black">
            Projects
          </Link>
          <span>/</span>
          <span className="text-black">{project.category}</span>
        </nav>
      </div>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="relative aspect-[16/10] overflow-hidden bg-[#111]">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900" />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <p className="mb-2 font-sans text-[10px] uppercase tracking-[0.2em] text-gray-400">
                  {project.location}
                </p>
                <h1 className="font-serif text-3xl italic leading-tight text-white md:text-4xl">
                  {project.title}
                </h1>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-px bg-gray-200 md:grid-cols-4">
              <div className="bg-white p-4">
                <p className="mb-1 font-sans text-[9px] uppercase tracking-[0.2em] text-gray-400">Category</p>
                <p className="font-sans text-xs font-semibold text-black">{project.category}</p>
              </div>
              <div className="bg-white p-4">
                <p className="mb-1 font-sans text-[9px] uppercase tracking-[0.2em] text-gray-400">Location</p>
                <p className="font-sans text-xs font-semibold text-black">{project.location}</p>
              </div>
              <div className="bg-white p-4">
                <p className="mb-1 font-sans text-[9px] uppercase tracking-[0.2em] text-gray-400">Budget</p>
                <p className="font-sans text-xs font-semibold text-black">{project.budget}</p>
              </div>
              <div className="bg-white p-4">
                <p className="mb-1 font-sans text-[9px] uppercase tracking-[0.2em] text-gray-400">Scope</p>
                <p className="font-sans text-xs font-semibold text-black">{project.scope}</p>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <p className="mb-3 font-sans text-[10px] uppercase tracking-[0.25em] text-gray-400">Case Study</p>
            <h2 className="mb-5 font-serif text-2xl italic text-black md:text-3xl">Project Overview</h2>
            <p className="mb-6 font-sans text-sm leading-relaxed text-gray-500">{project.description}</p>

            <div className="mb-8 border-y border-gray-200 py-5">
              <p className="mb-2 font-sans text-[9px] uppercase tracking-[0.2em] text-gray-400">Key Deliverables</p>
              <ul className="space-y-2">
                {project.tags.map((tag) => (
                  <li key={tag} className="font-sans text-xs uppercase tracking-[0.12em] text-black">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/contact"
              className="block w-full bg-black py-4 text-center font-sans text-xs uppercase tracking-[0.15em] text-white transition-colors hover:bg-gray-800"
            >
              Request Similar Project Quote
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-200 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-serif text-xl italic text-black">Related Projects</h2>
            <Link href="/projects" className="font-sans text-xs text-gray-400 transition-colors hover:text-black">
              Browse All Projects →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-px bg-gray-200 md:grid-cols-3">
            {relatedProjects.map((item) => (
              <Link key={item.slug} href={`/projects/${item.slug}`} className="group block bg-white">
                <div className="aspect-video bg-[#151515]" />
                <div className="p-4">
                  <p className="mb-1 font-sans text-[9px] uppercase tracking-[0.2em] text-gray-400">{item.category}</p>
                  <p className="font-sans text-sm font-medium text-black group-hover:underline">{item.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
