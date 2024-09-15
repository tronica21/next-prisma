import Pagination from '@/components/pagination'
import Search from '@/components/search'
import { divider } from '@nextui-org/react'
import { redirect } from 'next/dist/server/api-utils'
import Link from 'next/link'

// Define the User type
type User = {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

// Function to fetch users
export async function getUser(): Promise<User[]> {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const users: User[] = await response.json()

    return users
  } catch (error) {
    console.error('Error fetching users:', error)
    return []
  }
}

// Component to render users in a table
async function Dashboard({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] }
}) {
  const users = await getUser()

  const page = searchParams['page'] ?? '1'
  const perPage = searchParams['perpage'] ?? '5'
  const total = users.length + 10

  const start = (Number(page) - 1) * Number(perPage)
  const end = start + Number(perPage)
  const paginatedUser = users.slice(start, end)

  return (
    <section className='mt-10'>
      <div className='flex items-center'>
        <div className='my-4 text-5xl font-semibold'>User</div>
      </div>
      <div className='flex justify-between'>
        <Link href='users/create' className='btn h-fit text-sm'>
          add user
        </Link>
        <Search />
      </div>
      <div className='w-full border text-right text-xs italic text-slate-500'>
        Page {page} of {total}
      </div>
      <table className='w-full table-auto border-collapse border border-slate-400 text-sm text-slate-800'>
        <thead>
          <tr className='bg-slate-200'>
            <th className='border border-slate-400'>index</th>
            <th className='border border-slate-400'>Name</th>
            <th className='border border-slate-400'>Email</th>
            <th className='border border-slate-400'>Role</th>
            <th className='border border-slate-400'>Action</th>
          </tr>
        </thead>
        <tbody className='bg-slate-50'>
          {paginatedUser.length
            ? paginatedUser.map((user, index) => (
                <tr key={user.id} className='cursor-pointer'>
                  <td className='border border-slate-400 px-1 py-1 text-center'>
                    {index +
                      Math.ceil(Number(perPage) * Math.ceil(Number(page) - 1)) +
                      1}
                  </td>
                  <td className='border border-slate-400 px-1 hover:bg-indigo-200'>
                    <Link href={`/dashboard/user/${user.id}`}>{user.name}</Link>
                  </td>
                  <td className='border border-slate-400 px-1'>{user.email}</td>
                  <td className='border border-slate-400 px-1'>
                    {user.company.name}
                  </td>
                  <td className='border border-slate-400 px-1'>...</td>
                </tr>
              ))
            : ''}
        </tbody>

        {paginatedUser.length ? (
          ''
        ) : (
          <caption className='caption-bottom gap-4 bg-yellow-300/50 py-8'>
            <div className='mb-4'>No Data Foud</div>
            <Link href={`users?page=1&perpage=${perPage}`} className='btn'>
              reset
            </Link>
          </caption>
        )}
      </table>
      <div className='border p-2'>
        <Pagination
          page={Number(page)}
          totalitems={total}
          perPage={Number(perPage)}
        />
      </div>
    </section>
  )
}

export default Dashboard
