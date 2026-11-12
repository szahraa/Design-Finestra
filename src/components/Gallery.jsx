import { useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { ImagePlus } from 'lucide-react'
import { PROJECT_CATEGORIES } from '../lib/fallbackProjects'
import Lightbox from './Lightbox'

export default function Gallery({
  projects,
  loading,
  usingFallback,
  onOpenAdmin,
  isAdmin,
  onDelete,
}) {
  const [category, setCategory] = useState('Semua')
  const [active, setActive] = useState(null)

  const filtered = useMemo(() => {
    if (category === 'Semua') return projects
    return projects.filter((p) => p.category === category)
  }, [projects, category])

  return (
    <section id="proyek" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55 }}
            className="max-w-2xl"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-muted">
              What We&apos;re Working On
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold text-navy md:text-5xl">
              Hasil kerja &amp; proyek berjalan
            </h2>
            <p className="mt-4 text-ink/70">
              Dokumentasi pekerjaan civil, interior, dan kusen aluminium. Klik
              foto untuk melihat detail.
            </p>
          </motion.div>

          {isAdmin && (
            <button
              type="button"
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-2 self-start rounded-full border border-navy/15 bg-cream px-4 py-2.5 text-sm font-semibold text-navy transition hover:border-gold hover:text-gold-muted"
            >
              <ImagePlus size={16} />
              Upload proyek
            </button>
          )}
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {PROJECT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                category === cat
                  ? 'bg-navy text-gold'
                  : 'bg-cream text-ink/70 hover:bg-navy/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[4/3] animate-pulse rounded-2xl bg-cream"
              />
            ))}
          </div>
        ) : (
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project, index) => (
              <motion.button
                key={project.id}
                type="button"
                layout
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.45, delay: Math.min(index * 0.06, 0.36) }}
                whileHover={{ y: -4 }}
                onClick={() => setActive(project)}
                className="group relative overflow-hidden rounded-2xl bg-white text-left shadow-sm ring-1 ring-navy/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <div className="bg-white">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    loading="lazy"
                    className="h-auto w-full"
                  />
                </div>
                <div className="border-t border-navy/10 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-muted">
                    {project.category}
                  </p>
                  <h3 className="mt-1 font-display text-lg font-bold uppercase tracking-tight text-navy">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-xs text-ink/60">{project.description}</p>
                </div>
                {isAdmin && onDelete && (
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={(e) => {
                      e.stopPropagation()
                      onDelete(project)
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.stopPropagation()
                        onDelete(project)
                      }
                    }}
                    className="absolute right-3 top-3 rounded-full bg-navy/80 px-3 py-1 text-[11px] font-semibold text-white opacity-0 transition group-hover:opacity-100 hover:bg-red-600"
                  >
                    Hapus
                  </span>
                )}
              </motion.button>
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <p className="mt-16 text-center text-ink/50">
            Belum ada proyek di kategori ini.
          </p>
        )}
      </div>

      <Lightbox project={active} onClose={() => setActive(null)} />
    </section>
  )
}
