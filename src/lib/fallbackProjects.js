export const PROJECT_CATEGORIES = [
  'Semua',
  'Civil',
  'Interior',
  'Kusen Aluminium',
]

/** Brochure photos, used as-is until live Supabase uploads replace them */
export const FALLBACK_PROJECTS = [
  {
    id: 'fallback-interior',
    title: 'Kontraktor Interior & Furniture',
    description:
      'Desain · Produksi · Instalasi. Kitchen set, lemari custom, kamar tidur anak, meja belajar, backdrop TV, dan furniture custom.',
    category: 'Interior',
    image_url: '/projects/brochure-interior.png',
    created_at: '2026-11-13T00:08:18.000Z',
  },
  {
    id: 'fallback-kusen',
    title: 'Kusen & Jendela Kaca Aluminium',
    description:
      'Spesialis pembuatan kusen, jendela, pintu, dan sliding aluminium. Kuat, elegan, anti karat, tahan lama.',
    category: 'Kusen Aluminium',
    image_url: '/projects/brochure-kusen.png',
    created_at: '2026-11-13T00:08:17.000Z',
  },
  {
    id: 'fallback-kontraktor',
    title: 'Kontraktor Civil, Interior & Kusen Aluminium',
    description:
      'Pekerjaan civil, interior, dan kusen aluminium. Kualitas terjamin, tepat waktu, harga kompetitif.',
    category: 'Civil',
    image_url: '/projects/brochure-kontraktor.png',
    created_at: '2026-11-13T00:08:18.000Z',
  },
]
