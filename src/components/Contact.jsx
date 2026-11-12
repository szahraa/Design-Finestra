import { motion } from 'motion/react'
import { MapPin, Clock, Phone, Mail, MessageCircle } from 'lucide-react'
import { COMPANY } from '../lib/constants'

export default function Contact() {
  return (
    <section id="kontak" className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
          className="max-w-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-muted">
            Lokasi &amp; Kontak
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold text-navy md:text-5xl">
            Hubungi kami sekarang
          </h2>
          <p className="mt-4 text-ink/70">
            Siap melayani area {COMPANY.area}. Survey &amp; konsultasi gratis.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden rounded-2xl bg-navy shadow-xl shadow-navy/10"
          >
            <iframe
              title="Lokasi Design Finestra Indonesia"
              src={COMPANY.mapEmbedUrl}
              className="h-[320px] w-full border-0 md:h-[420px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col justify-between rounded-2xl bg-white p-8 shadow-sm ring-1 ring-navy/5 md:p-10"
          >
            <div className="space-y-6">
              <div className="flex gap-4">
                <MapPin className="mt-0.5 shrink-0 text-gold-muted" size={20} />
                <div>
                  <p className="text-sm font-semibold text-navy">Alamat</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink/70">
                    {COMPANY.address}
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Clock className="mt-0.5 shrink-0 text-gold-muted" size={20} />
                <div>
                  <p className="text-sm font-semibold text-navy">Jam operasional</p>
                  <p className="mt-1 text-sm text-ink/70">{COMPANY.hours}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Phone className="mt-0.5 shrink-0 text-gold-muted" size={20} />
                <div>
                  <p className="text-sm font-semibold text-navy">Telepon / WA</p>
                  <a
                    href={COMPANY.whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 block text-sm text-ink/70 transition hover:text-gold-muted"
                  >
                    {COMPANY.phone}
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <Mail className="mt-0.5 shrink-0 text-gold-muted" size={20} />
                <div>
                  <p className="text-sm font-semibold text-navy">Email</p>
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="mt-1 block text-sm text-ink/70 transition hover:text-gold-muted"
                  >
                    {COMPANY.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href={COMPANY.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 text-sm font-semibold text-white transition hover:brightness-110"
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>
              <a
                href={`mailto:${COMPANY.email}?subject=Konsultasi%20Design%20Finestra`}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-navy px-5 py-3.5 text-sm font-semibold text-gold transition hover:bg-navy-soft"
              >
                <Mail size={18} />
                Kirim Email
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
