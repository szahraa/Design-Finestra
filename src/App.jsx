import { useCallback, useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Gallery from './components/Gallery'
import Workflow from './components/Workflow'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AdminModal from './components/AdminModal'
import { supabase, isSupabaseConfigured } from './lib/supabase'
import { FALLBACK_PROJECTS } from './lib/fallbackProjects'

export default function App() {
  const [projects, setProjects] = useState(FALLBACK_PROJECTS)
  const [usingFallback, setUsingFallback] = useState(true)
  const [loading, setLoading] = useState(true)
  const [adminOpen, setAdminOpen] = useState(false)
  const [session, setSession] = useState(null)

  const fetchProjects = useCallback(async () => {
    setLoading(true)

    if (!isSupabaseConfigured || !supabase) {
      setProjects(FALLBACK_PROJECTS)
      setUsingFallback(true)
      setLoading(false)
      return
    }

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

    if (error || !data?.length) {
      setProjects(FALLBACK_PROJECTS)
      setUsingFallback(true)
    } else {
      setProjects(data)
      setUsingFallback(false)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  useEffect(() => {
    if (!supabase) return undefined

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
    })

    return () => subscription.unsubscribe()
  }, [])

  async function handleDelete(project) {
    if (!supabase || !session) return
    if (String(project.id).startsWith('fallback-')) return
    if (!window.confirm(`Hapus proyek “${project.title}”?`)) return

    const { error } = await supabase.from('projects').delete().eq('id', project.id)
    if (error) {
      window.alert(error.message)
      return
    }
    fetchProjects()
  }

  return (
    <div className="min-h-screen bg-cream">
      <Navbar onOpenAdmin={() => setAdminOpen(true)} />
      <main>
        <Hero />
        <Services />
        <Gallery
          projects={projects}
          loading={loading}
          usingFallback={usingFallback}
          isAdmin={Boolean(session)}
          onOpenAdmin={() => setAdminOpen(true)}
          onDelete={handleDelete}
        />
        <Workflow />
        <Contact />
      </main>
      <Footer />
      <AdminModal
        open={adminOpen}
        onClose={() => setAdminOpen(false)}
        session={session}
        onAuthChange={() => {}}
        onUploaded={fetchProjects}
      />
    </div>
  )
}
