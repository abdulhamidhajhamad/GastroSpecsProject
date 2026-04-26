import Link from 'next/link'

type CategoryCardProps = {
  name: string
  description?: string
  imageUrl?: string
  href: string
  badge?: string
}

export default function CategoryCard({
  name,
  description,
  imageUrl,
  href,
  badge,
}: CategoryCardProps) {
  return (
    <Link href={href} className="group block relative aspect-[4/3] overflow-hidden bg-[#111111]">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/20">
            {name}
          </span>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

      {badge && (
        <div className="absolute top-3 right-3 z-10">
          <span className="font-sans text-[9px] tracking-[0.15em] uppercase text-white/70 bg-black/50 px-2 py-1">
            {badge}
          </span>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
        <h3 className="font-mono font-bold uppercase tracking-tight text-white text-sm leading-tight">
          {name}
        </h3>
        {description && (
          <p className="font-sans text-xs text-white/50 mt-1 line-clamp-1">
            {description}
          </p>
        )}
      </div>
    </Link>
  )
}
