// ============================================================
// UTILS — Dusun Sukamaju
// ============================================================

/**
 * Format tanggal dari "YYYY-MM-DD" menjadi objek { day, month, full }
 */
export function formatTanggal(tanggal: string) {
  const d = new Date(tanggal)
  const day   = d.getDate().toString().padStart(2, '0')
  const month = d.toLocaleString('id-ID', { month: 'short' })
  const full  = d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
  return { day, month, full }
}

/**
 * Warna badge berdasarkan kategori berita
 */
export function getBadgeStyle(kategori: string): { bg: string; text: string } {
  const map: Record<string, { bg: string; text: string }> = {
    Pembangunan: { bg: '#E8F5E9', text: '#1D6A3A' },
    Budaya:      { bg: '#FFF8E1', text: '#8A6A00' },
    Kesehatan:   { bg: '#EEF4FB', text: '#1D5CA8' },
    Pendidikan:  { bg: '#F3E5F5', text: '#6A1D8A' },
    Umum:        { bg: '#E8EDE9', text: '#4A5E4F' },
  }
  return map[kategori] ?? map['Umum']
}

/**
 * Truncate teks panjang
 */
export function truncate(text: string, max = 100): string {
  return text.length > max ? text.slice(0, max) + '…' : text
}
