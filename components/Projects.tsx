import Image from "next/image"
import Link from "next/link"

const projects = [
  {
    image: "/assets/project_obsidian_grill.png",
    category: "PROJECTS",
    title: "The Obsidian Grill",
  },
  {
    image: "/assets/project_global_tech_hq.png",
    category: "PROJECT",
    title: "Global Tech HQ",
  },
  {
    image: "/assets/project_global_tech_hq.png",
    category: "PROJECTS",
    title: "Global Tech HQ",
  },
]

export default function Projects() {
  return (
    <section className="py-20 bg-gastro-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-gastro-black">
            Precision In-Situ.
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Link href="/projects" key={index} className="group">
              <div className="relative aspect-[4/3] overflow-hidden mb-4">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="text-xs text-gray-500 tracking-widest uppercase mb-1">
                {project.category}
              </p>
              <h3 className="text-base font-medium text-gastro-black">
                {project.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
