import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'motion/react'
import { X, LogOut, Upload } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { PROJECT_CATEGORIES } from '../lib/fallbackProjects'

const UPLOAD_CATEGORIES = PROJECT_CATEGORIES.filter((c) => c !== 'Semua')

const emptyForm = {
  title: '',
  description: '',
  category: UPLOAD_CATEGORIES[0],
  file: null,
}

export default function AdminModal({ open, onClose, session, onAuthChange, onUploaded }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [form, setForm] = useState(emptyForm)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  useEffect(() => {
    if (!open) {
      setError('')
      setSuccess('')
      setForm(emptyForm)
      setPassword('')
    }
  }, [open])

  async function handleLogin(e) {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!isSupabaseConfigured || !supabase) {
      setError('Supabase belum dikonfigurasi. Isi VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY.')
      return
    }

    setBusy(true)
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    setBusy(false)

    if (loginError) {
      setError(loginError.message)
      return
    }
    onAuthChange?.()
  }

  async function handleLogout() {
    if (!supabase) return
    setBusy(true)
    await supabase.auth.signOut()
    setBusy(false)
    onAuthChange?.()
  }

  async function handleUpload(e) {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!supabase || !session) {
      setError('Anda harus login terlebih dahulu.')
      return
    }
    if (!form.file || !form.title.trim()) {
      setError('Judul dan foto wajib diisi.')
      return
    }

    setBusy(true)
    try {
      const ext = form.file.name.split('.').pop() || 'jpg'
      const path = `${Date.now()}-${crypto.randomUUID()}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from('project-photos')
        .upload(path, form.file, {
          cacheControl: '3600',
          upsert: false,
          contentType: form.file.type,
        })

      if (uploadError) throw uploadError

      const { data: publicData } = supabase.storage
        .from('project-photos')
        .getPublicUrl(path)

      const { error: insertError } = await supabase.from('projects').insert({
        title: form.title.trim(),
        description: form.description.trim(),
        category: form.category,
        image_url: publicData.publicUrl,
      })

      if (insertError) throw insertError

      setSuccess('Proyek berhasil diunggah.')
      setForm(emptyForm)
      onUploaded?.()
    } catch (err) {
      setError(err.message || 'Gagal mengunggah proyek.')
    } finally {
      setBusy(false)
    }
  }

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-end justify-center bg-navy-deep/80 p-0 backdrop-blur-sm sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-muted">
                  Admin
                </p>
                <h2 className="mt-1 font-display text-2xl font-semibold text-navy">
                  {session ? 'Upload proyek' : 'Login tim'}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-2 text-ink/50 transition hover:bg-cream hover:text-navy"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            {!isSupabaseConfigured && (
              <p className="mb-4 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900">
                Mode lokal: set environment variables Supabase di `.env` lalu restart
                `npm run dev`.
              </p>
            )}

            {error && (
              <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            )}
            {success && (
              <p className="mb-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                {success}
              </p>
            )}

            {!session ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-navy">Email</span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-navy/10 bg-cream px-4 py-3 text-sm outline-none transition focus:border-gold"
                    placeholder="tim@designfinestra.com"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-navy">Password</span>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-navy/10 bg-cream px-4 py-3 text-sm outline-none transition focus:border-gold"
                    placeholder="••••••••"
                  />
                </label>
                <button
                  type="submit"
                  disabled={busy}
                  className="w-full rounded-full bg-navy py-3.5 text-sm font-semibold text-gold transition hover:bg-navy-soft disabled:opacity-60"
                >
                  {busy ? 'Masuk…' : 'Masuk'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleUpload} className="space-y-4">
                <p className="rounded-xl bg-cream px-4 py-3 text-sm text-ink/70">
                  Login sebagai{' '}
                  <span className="font-semibold text-navy">{session.user?.email}</span>
                </p>

                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-navy">Judul</span>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                    className="w-full rounded-xl border border-navy/10 bg-cream px-4 py-3 text-sm outline-none transition focus:border-gold"
                    placeholder="Contoh: Kitchen set rumah Bintaro"
                  />
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-navy">
                    Deskripsi
                  </span>
                  <textarea
                    rows={3}
                    value={form.description}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, description: e.target.value }))
                    }
                    className="w-full resize-none rounded-xl border border-navy/10 bg-cream px-4 py-3 text-sm outline-none transition focus:border-gold"
                    placeholder="Ringkasan singkat proyek…"
                  />
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-navy">
                    Kategori
                  </span>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, category: e.target.value }))
                    }
                    className="w-full rounded-xl border border-navy/10 bg-cream px-4 py-3 text-sm outline-none transition focus:border-gold"
                  >
                    {UPLOAD_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-navy">Foto</span>
                  <input
                    type="file"
                    accept="image/*"
                    required
                    onChange={(e) =>
                      setForm((f) => ({ ...f, file: e.target.files?.[0] || null }))
                    }
                    className="block w-full text-sm text-ink/70 file:mr-4 file:rounded-full file:border-0 file:bg-navy file:px-4 file:py-2 file:text-sm file:font-semibold file:text-gold hover:file:bg-navy-soft"
                  />
                </label>

                <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                  <button
                    type="submit"
                    disabled={busy}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gold py-3.5 text-sm font-semibold text-navy transition hover:bg-gold-light disabled:opacity-60"
                  >
                    <Upload size={16} />
                    {busy ? 'Mengunggah…' : 'Upload'}
                  </button>
                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={busy}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-navy/15 px-5 py-3.5 text-sm font-semibold text-navy transition hover:border-navy/30 disabled:opacity-60"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
