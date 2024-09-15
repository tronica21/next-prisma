export default function DashLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <section className='container h-screen rounded-md bg-slate-100 p-8'>
        {children}
      </section>
    </>
  )
}
