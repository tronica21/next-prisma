import Link from 'next/link'

export default function Home() {
  return (
    <section>
      <div className='mt-8 grid grid-cols-2'>
        <div className='container h-screen'>
          <div className='flex h-screen flex-col justify-center gap-4 lg:ml-8'>
            <div className='text-3xl font-bold'>Next Starter</div>
            <div className='text-xl'>Starter Pack for Next JS</div>
            <div className='flex gap-1'>
              <Link href='/dashboard' className='btn'>
                Dashboard
              </Link>
              <Link href='/dashboard' className='btn-outline'>
                Documentation
              </Link>
            </div>
          </div>
        </div>
        <div className='bg-slate-400'></div>
      </div>
    </section>
  )
}
