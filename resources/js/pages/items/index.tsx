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

          <Link href={items.create().url} className="btn-primary">
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
                <tr key={item.id}>
                  <td>{item.code}</td>
                  <td>{item.name}</td>
                  <td>Rp {item.price.toLocaleString()}</td>
                  <td className="space-x-2">
                    <Link
                      href={items.edit({ item: item.id }).url}
                      className="btn"
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
                      className="btn-danger"
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
