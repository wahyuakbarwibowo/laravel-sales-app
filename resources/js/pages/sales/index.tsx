import { BreadcrumbItem, Pagination, Sale } from "@/types"
import AppLayout from '@/layouts/app-layout'
import { PageProps } from '@/types'
import { Link, router } from '@inertiajs/react'
import * as salesRoute from "@/routes/sales"

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

          <Link
            href={salesRoute.create().url}
            className="btn-primary"
          >
            + Tambah Penjualan
          </Link>
        </div>

        <div className="card overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Kode</th>
                <th>Tanggal</th>
                <th>Total</th>
                <th>Status</th>
                <th className="text-right">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {sales.data.map(sale => (
                <tr key={sale.id}>
                  <td>{sale.code}</td>
                  <td>{sale.sale_date}</td>
                  <td>
                    Rp {sale.total_amount.toLocaleString()}
                  </td>
                  <td>
                    <StatusBadge status={sale.status} />
                  </td>
                  <td className="text-right space-x-2">
                    <Link
                      href={salesRoute.show({ sale: sale.id }).url}
                      className="btn"
                    >
                      Detail
                    </Link>

                    {sale.status === 'BELUM_DIBAYAR' && (
                      <>
                        <Link
                          href={salesRoute.edit({ sale: sale.id }).url}
                          className="btn"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() => destroy(sale.id)}
                          className="btn-danger"
                        >
                          Hapus
                        </button>
                      </>
                    )}
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

function StatusBadge({ status }: { status: string }) {
  const map: any = {
    BELUM_DIBAYAR: 'bg-yellow-100 text-yellow-800',
    SUDAH_DIBAYAR: 'bg-green-100 text-green-800',
  }

  return (
    <span className={`px-2 py-1 rounded text-xs ${map[status]}`}>
      {status.replace('_', ' ')}
    </span>
  )
}

const destroy = (id: number) => {
  if (!confirm('Hapus penjualan ini?')) return

  router.delete(
    salesRoute.destroy({ params: { sale: id } }).url
  )
}