import { useEffect, useState } from 'react'
import { Menu, X, Lock } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { COMPANY } from '../lib/constants'

const links = [
  { href: '#layanan', label: 'Layanan' },
  { href: '#proyek', label: 'Proyek' },
  { href: '#alur', label: 'Alur Kerja' },
  { href: '#kontak', label: 'Kontak' },
]

export default function Navbar({ onOpenAdmin }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? 'shadow-md shadow-navy/10' : 'shadow-sm shadow-navy/5'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-2 md:px-8">
        <a href="#beranda" className="flex items-center">
          <img
            src="/logo.png"
            alt="Design Finestra Indonesia"
            className="h-14 w-auto sm:h-16 md:h-[4.5rem]"
          />
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold uppercase tracking-wide text-navy transition hover:text-gold-muted"
            >
              {link.label}
            </a>
          ))}
          <a
            href={COMPANY.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-navy transition hover:bg-gold-light"
          >
            WhatsApp
          </a>
        </div>

        <button
          type="button"
          className="rounded-md p-2 text-navy lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="border-t border-navy/10 bg-white px-5 py-6 lg:hidden"
          >
            <div className="flex flex-col gap-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-base font-semibold uppercase tracking-wide text-navy"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={COMPANY.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 rounded-full bg-gold px-5 py-3 text-center text-sm font-semibold text-navy"
              >
                Chat WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
