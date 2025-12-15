export default function DashboardLayout({
  sidebar,
  content,
}: {
  sidebar: React.ReactNode
  content: React.ReactNode
}) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside style={{ width: 240, borderRight: '1px solid #ddd' }}>
        {sidebar}
      </aside>

      <main style={{ flex: 1, padding: 20 }}>
        {content}
      </main>
    </div>
  )
}
