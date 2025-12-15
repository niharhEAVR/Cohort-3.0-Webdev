// app/(dashboard)/@sidebar/page.tsx
import Link from 'next/link'

export default function Sidebar() {
  return (
    <nav>
      <h3 className='font-bold text-2xl mb-5 text-center'>Dashboard</h3>
      <ul className='font-bold text-l text-center'>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/dashboard/users">Users</Link></li>
        <li><Link href="/dashboard/settings">Settings</Link></li>
      </ul>
    </nav>
  )
}
