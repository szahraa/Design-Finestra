import { motion } from 'motion/react'
import { WORKFLOW } from '../lib/constants'

export default function Workflow() {
  return (
    <section id="alur" className="bg-navy py-20 text-white md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
          className="max-w-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
            Alur Pekerjaan
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold md:text-5xl">
            Proses jelas dari konsultasi hingga garansi
          </h2>
        </motion.div>

        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {WORKFLOW.map((item, index) => (
            <motion.li
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="relative border-t border-gold/40 pt-5"
            >
              <span className="font-display text-3xl text-gold">{item.step}</span>
              <h3 className="mt-3 text-base font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                {item.detail}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
