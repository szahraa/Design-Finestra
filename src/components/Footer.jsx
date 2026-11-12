import { COMPANY } from '../lib/constants'

export default function Footer() {
  return (
    <footer className="bg-navy-deep text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-12 md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <img
            src="/logo.png"
            alt={COMPANY.legalName}
            className="h-16 w-auto sm:h-20" 
          />
          <p className="mt-2 max-w-md text-sm text-white/60">
            Kepuasan Anda adalah prioritas kami. Desain menawan · Hasil memuaskan
            · Ruang impian Anda.
          </p>
        </div>
        <div className="flex flex-wrap gap-5 text-sm text-white/70">
          <a
            href={COMPANY.instagram}
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-gold"
          >
            Instagram
          </a>
          <a
            href={COMPANY.facebook}
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-gold"
          >
            Facebook
          </a>
          <a
            href={COMPANY.website}
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-gold"
          >
            Website
          </a>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-5 py-4 text-center text-xs uppercase tracking-[0.18em] text-white/45 md:px-8">
          © {new Date().getFullYear()} {COMPANY.name} · Jabodetabek &amp; seluruh
          Indonesia
        </p>
      </div>
    </footer>
  )
}
