export default function Toast() {
  return (
    <>
      <div id="toast" style={{
        position: 'fixed', bottom: 28, right: 28,
        background: '#1D6A3A', color: '#fff',
        padding: '14px 22px', borderRadius: 12,
        fontSize: 14, fontWeight: 500,
        boxShadow: '0 8px 24px rgba(29,106,58,0.35)',
        transform: 'translateY(80px)', opacity: 0,
        transition: 'all .35s cubic-bezier(.34,1.56,.64,1)',
        zIndex: 3000,
        pointerEvents: 'none',
      }} />

      <style>{`
        #toast.show {
          transform: translateY(0) !important;
          opacity: 1 !important;
        }
      `}</style>
    </>
  )
}
