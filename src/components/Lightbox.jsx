import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'motion/react'
import { X } from 'lucide-react'

export default function Lightbox({ project, onClose }) {
  useEffect(() => {
    if (!project) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [project, onClose])

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-navy-deep/90 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.figure
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-navy shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 z-10 rounded-full bg-navy/70 p-2 text-white backdrop-blur transition hover:bg-gold hover:text-navy"
              aria-label="Close preview"
            >
              <X size={20} />
            </button>
            <img
              src={project.image_url}
              alt={project.title}
              className="max-h-[75vh] w-full bg-white object-contain"
            />
            <figcaption className="space-y-2 p-5 md:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                {project.category}
              </p>
              <h3 className="font-display text-2xl font-semibold text-white">
                {project.title}
              </h3>
              {project.description && (
                <p className="text-sm leading-relaxed text-white/70">
                  {project.description}
                </p>
              )}
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
