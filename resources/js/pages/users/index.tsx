import AppLayout from '@/layouts/app-layout'
import { PageProps, User } from '@/types'
import { router } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import * as userRoutes from '@/routes/master/users'

export default function Index(
  { users }: PageProps<{ users: User[] }>
) {
  console.log(users)
  return (
    <AppLayout>
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">User</h1>

        <Button asChild className="mb-4">
          <a href={userRoutes.create().url}>Tambah User</a>
        </Button>

        <div className="overflow-x-auto border rounded">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="px-3 py-2">Nama</th>
                <th className="px-3 py-2">Email</th>
                <th className="px-3 py-2 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: any) => (
                <tr key={user.id} className="border-t">
                  <td className="px-3 py-2 text-center">{user.name}</td>
                  <td className="px-3 py-2 text-center">{user.email}</td>
                  <td className="px-3 py-2 text-center space-x-2">
                    <a
                      href={userRoutes.edit({ user: user.id }).url}
                      className="text-amber-600 hover:underline"
                    >
                      Edit
                    </a>
                    <button
                      onClick={() =>
                        confirm('Hapus user?') &&
                        router.delete(userRoutes.destroy({ user: user.id }))
                      }
                      className="text-red-600 hover:underline"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  )
}
