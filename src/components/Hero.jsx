import { motion } from 'motion/react'
import { ArrowRight, ShieldCheck, Sparkles, BadgeCheck } from 'lucide-react'
import { COMPANY, TRUST_POINTS } from '../lib/constants'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80'

export default function Hero() {
  return (
    <section id="beranda" className="relative min-h-[100svh] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Hunian modern dengan kusen dan jendela kaca aluminium Design Finestra"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/95 via-navy/85 to-navy/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-transparent to-navy/30" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-16 pt-32 md:justify-center md:px-8 md:pb-24 md:pt-36">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex w-fit"
        >
          <img
            src="/logo.png"
            alt="Design Finestra Indonesia"
            className="h-16 w-auto sm:h-20 md:h-24"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-3xl font-display text-4xl font-extrabold uppercase leading-[1.05] tracking-tight text-white text-balance sm:text-5xl md:text-6xl"
        >
          Kontraktor Interior, Civil &amp; Kusen Aluminium
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.22 }}
          className="mt-5 max-w-xl text-base text-white/80 md:text-lg"
        >
          Solusi tepat untuk hunian, ruko, kantor, dan bangunan Anda — desain
          elegan, kualitas premium, hasil maksimal.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <a
            href={COMPANY.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-navy transition hover:bg-gold-light"
          >
            Survey &amp; Konsultasi Gratis
            <ArrowRight
              size={16}
              className="transition group-hover:translate-x-0.5"
            />
          </a>
          <a
            href="#proyek"
            className="inline-flex items-center rounded-full border border-white/35 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-gold hover:text-gold"
          >
            Lihat Hasil Kerja
          </a>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-12 flex flex-wrap gap-6 border-t border-white/15 pt-8 md:gap-10"
        >
          {TRUST_POINTS.map((point, i) => {
            const Icon = [ShieldCheck, Sparkles, BadgeCheck][i]
            return (
              <li key={point.title} className="flex items-start gap-3">
                <span className="mt-0.5 text-gold">
                  <Icon size={18} />
                </span>
                <span>
                  <span className="block text-sm font-semibold uppercase tracking-wider text-gold">
                    {point.title}
                  </span>
                  <span className="text-sm text-white/65">{point.detail}</span>
                </span>
              </li>
            )
          })}
        </motion.ul>
      </div>
    </section>
  )
}
