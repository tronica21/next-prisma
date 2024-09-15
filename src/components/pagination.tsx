'use client' // Ensure this component is rendered client-side

import Link from 'next/link'
import { navigate } from '@/app/lib/actions'

interface PaginationProps {
  page?: number | undefined // `page` can be undefined
  totalitems?: number | undefined
  perPage?: number | undefined
}

export default function Pagination({
  page,
  totalitems,
  perPage
}: PaginationProps) {
  const totalPages = Math.ceil(Number(totalitems) / Number(perPage))

  // console.log(perPage)
  const generatePageLinks = () => {
    const links = []
    for (
      let i = Math.max(1, Number(page) - 5);
      i <= Math.min(totalPages, Number(page) + 5);
      i++
    ) {
      links.push(
        <Link
          key={i}
          href={`/dashboard/users?page=${i}&perpage=${perPage}`}
          className={`border-1 min-w-8 border border-slate-400 p-1 px-2 text-center ${i === page ? 'bg-indigo-500 text-white' : ''}`}
        >
          {i}
        </Link>
      )
    }
    return links
  }

  const handleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault()
    const perPage = event.target.value
    navigate(`/dashboard/users?page=1&perpage=${perPage}`)
  }

  return (
    <div className='mt-2 flex justify-between gap-1 text-sm text-slate-800'>
      <select
        name='perPage'
        id='perPage'
        className='border-1 rounded-lg border border-slate-400 p-1 px-2 text-slate-700'
        onChange={handleChange}
        value={perPage}
      >
        <option value='5'>5 data / page</option>
        <option value='10'>10 data / page</option>
        <option value='30'>30 data / page</option>
        <option value='50'>50 data / page</option>
      </select>

      {Number(totalPages) <= 1 ? (
        <div>No Paginaton</div>
      ) : (
        <div className='flex'>
          {Number(page) <= 1 ? (
            <div className='border-1 select-none rounded-l-md border border-slate-400 p-1 px-2 text-slate-400'>
              Prev
            </div>
          ) : (
            <Link
              href={`/dashboard/users?page=${Math.max(1, Number(page) - 1)}&perpage=${perPage}`}
              className='border-1 rounded-l-md border border-slate-400 p-1 px-2'
            >
              Prev
            </Link>
          )}

          {generatePageLinks()}

          {Number(page) == Number(totalPages) ? (
            <div className='border-1 select-none rounded-r-md border border-slate-400 p-1 px-2 text-slate-400'>
              Next
            </div>
          ) : (
            <Link
              href={`/dashboard/users?page=${Math.min(Number(totalitems), Number(page) + 1)}&perpage=${perPage}`}
              className={`border-1 rounded-r-md border border-slate-400 p-1 px-2 ${Number(page) == Number(totalitems)}`}
            >
              Next
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
