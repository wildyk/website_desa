interface SectionHeaderProps {
  tag: string
  title: string
  desc?: string
  center?: boolean
  light?: boolean
}

export default function SectionHeader({ tag, title, desc, center = false, light = false }: SectionHeaderProps) {
  return (
    <div style={{ marginBottom: 48, textAlign: center ? 'center' : 'left' }}>
      <span style={{
        display: 'inline-block',
        background: light ? 'rgba(255,255,255,0.1)' : '#F0FAF4',
        color: light ? '#4CAF77' : '#1D6A3A',
        fontSize: 12, fontWeight: 600,
        padding: '5px 14px', borderRadius: 100,
        textTransform: 'uppercase', letterSpacing: '.8px',
        marginBottom: 14,
        border: light ? 'none' : '1px solid rgba(29,106,58,0.15)',
      }}>
        {tag}
      </span>
      <h2 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 'clamp(28px, 3.5vw, 42px)',
        fontWeight: 700, lineHeight: 1.2,
        marginBottom: desc ? 14 : 0,
        color: light ? '#fff' : '#1A2E1F',
      }}>
        {title}
      </h2>
      {desc && (
        <p style={{
          fontSize: 16,
          color: light ? 'rgba(255,255,255,0.68)' : '#4A5E4F',
          maxWidth: 520,
          margin: center ? '0 auto' : undefined,
          lineHeight: 1.7,
        }}>
          {desc}
        </p>
      )}
    </div>
  )
}
