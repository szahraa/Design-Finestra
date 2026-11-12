import { motion } from 'motion/react'
import { SERVICES } from '../lib/constants'

export default function Services() {
  return (
    <section id="layanan" className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
          className="max-w-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-muted">
            Layanan Kami
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold text-navy md:text-5xl">
            Tiga pilar keahlian, satu standar kualitas
          </h2>
          <p className="mt-4 text-ink/70">
            Dari struktur bangunan, interior custom, hingga kusen aluminium kami tangani. 
            Kami menyediakan layanan desain, produksi, dan instalasi.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {SERVICES.map((service, index) => (
            <motion.article
              key={service.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-2xl bg-navy p-8 text-white shadow-xl shadow-navy/10"
            >
              <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gold/10 transition group-hover:bg-gold/20" />
              <p className="font-display text-4xl text-gold/80">{service.number}</p>
              <h3 className="mt-4 font-display text-2xl font-semibold text-gold">
                {service.title}
              </h3>
              <p className="mt-2 text-sm text-white/70">{service.description}</p>
              <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-6">
                {service.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-white/85"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#proyek"
                className="mt-8 inline-block text-sm font-semibold text-gold transition hover:text-gold-light"
              >
                Lihat proyek terkait →
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
