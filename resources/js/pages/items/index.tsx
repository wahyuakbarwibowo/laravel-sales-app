import AppLayout from '@/layouts/app-layout'
import { Link, router } from '@inertiajs/react'
import { PageProps } from '@/types'
import items from "@/routes/master/items"


interface Item {
  id: number
  code: string
  name: string
  price: number
  image?: string
}

export default function Index(
  { items: paginated }: PageProps<{ items: any }>
) {
  return (
    <AppLayout>
      <div className="p-4 space-y-4">
        <div className="flex justify-between">
          <h1 className="text-xl font-bold">Master Item</h1>

          <Link href={items.create().url} className="p-2 rounded-full bg-black text-white">
            + Tambah Item
          </Link>
        </div>

        <div className="card overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Kode</th>
                <th>Nama</th>
                <th>Harga</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {paginated.data.map((item: Item) => (
                <tr key={item.id} className="border-t">
                  <td className="text-center">{item.code}</td>
                  <td className="text-center">{item.name}</td>
                  <td className="text-center">Rp {item.price.toLocaleString()}</td>
                  <td className="space-x-2 text-center">
                    <Link
                      href={items.edit({ item: item.id }).url}
                      className="text-amber-600 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() =>
                        confirm('Hapus item?') &&
                        router.delete(
                          items.destroy({ item: item.id }).url
                        )
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
