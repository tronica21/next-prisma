import Link from 'next/link'

export default function Navigation() {
  return (
    <div className='container fixed flex items-center justify-between bg-slate-50 p-4'>
      <div className='flex gap-4'>
        <Link href='/'>Home</Link>
        <Link href='/dashboard/users'>Users</Link>
        <Link href='/'>Settings</Link>
      </div>
      <Link href='/'>Login</Link>
    </div>
  )
}
