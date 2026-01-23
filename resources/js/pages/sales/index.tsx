import { BreadcrumbItem, Pagination, Sale, SalePayment } from "@/types"
import AppLayout from '@/layouts/app-layout'
import { PageProps } from '@/types'
import { Link, router } from '@inertiajs/react'
import * as salesRoute from "@/routes/sales"
import { Button } from "@/components/ui/button"

interface Props {
  sales: Pagination<Sale>
  filters: {
    from?: string
    to?: string
  }
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Penjualan',
    href: salesRoute.index.url(),
  },
];

export default function Index(
  { sales, filters }: PageProps<Props>
) {
  const filterDate = (key: 'from' | 'to', value: string) => {
    router.get(
      salesRoute.index().url,
      { ...filters, [key]: value },
      { preserveState: true }
    )
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="p-4 space-y-4">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <input
              type="date"
              value={filters.from || ''}
              onChange={e => filterDate('from', e.target.value)}
              className="input"
            />
            <input
              type="date"
              value={filters.to || ''}
              onChange={e => filterDate('to', e.target.value)}
              className="input"
            />
          </div>

          <Button asChild className="mb-4">
            <Link
              href={salesRoute.create().url}
              className="btn-primary"
            >
              + Tambah Penjualan
            </Link>
          </Button>
        </div>

        <div className="card overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Kode</th>
                <th>Tanggal</th>
                <th>Total</th>
                <th>Status</th>
                <th className="text-center">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {sales.data.map((sale: SalePayment) => (
                <tr key={sale.id} className="border-t">
                  <td className="text-center">{sale.code}</td>
                  <td className="text-center">{sale.sale_date}</td>
                  <td className="text-center">
                    Rp {sale.total_amount.toLocaleString()}
                  </td>
                  <td className="text-center">
                    <StatusBadge status={sale.status} />
                  </td>
                  <td className="text-center space-x-2">
                    <Link
                      href={salesRoute.show({ sale: sale.id }).url}
                      className="text-blue-600 hover:underline"
                    >
                      Detail
                    </Link>

                    {sale.status === 'BELUM_DIBAYAR' && (
                      <>
                        <Link
                          href={salesRoute.edit({ sale: sale.id }).url}
                          className="text-amber-600 hover:underline"
                        >
                          Edit
                        </Link>

                        <Button
                          onClick={() => destroy(sale.id)}
                          className="text-red-600 hover:underline bg-white hover:bg-white"
                        >
                          Hapus
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-4">
          <nav className="flex gap-1">
            {sales.links.map((link, index) => (
              <button
                key={index}
                disabled={!link.url}
                onClick={() => {
                  if (link.url) {
                    router.get(link.url, {}, { preserveState: true })
                  }
                }}
                className={`
                  px-3 py-1 border rounded
                  ${link.active ? 'bg-blue-600 text-white' : 'bg-white'}
                  ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}
                `}
                dangerouslySetInnerHTML={{ __html: link.label }}
              />
            ))}
          </nav>
        </div>

      </div>
    </AppLayout>
  )
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    BELUM_DIBAYAR: 'bg-red-100 text-red-800',
    SUDAH_DIBAYAR: 'bg-green-100 text-green-800',
    BELUM_DIBAYAR_SEPENUHNYA: 'bg-yellow-100 text-yellow-800',
  }

  return (
    <span
      className={`px-2 py-1 rounded text-xs ${map[status] ?? 'bg-gray-100 text-gray-800'
        }`}
    >
      {status.replace(/_/g, ' ')}
    </span>
  )
}

const destroy = (id: number) => {
  if (!confirm('Hapus penjualan ini?')) return

  router.delete(
    salesRoute.destroy({ sale: id }).url
  )
}