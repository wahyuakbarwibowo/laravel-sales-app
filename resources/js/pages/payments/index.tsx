import { BreadcrumbItem, PageProps, Payment } from '@/types'
import { router } from '@inertiajs/react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import * as paymentRoutes from '@/routes/payments'
import AppLayout from "@/layouts/app-layout"

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Penjualan',
    href: paymentRoutes.index.url(),
  },
];

export default function Index(
  { payments, filters }: PageProps<{
    payments: Payment[]
    filters: {
      start?: string
      end?: string
    }
  }>
) {
  const [start, setStart] = useState(filters.start ?? '')
  const [end, setEnd] = useState(filters.end ?? '')

  const applyFilter = () => {
    router.get(
      paymentRoutes.index().url,
      { start, end },
      { preserveState: true }
    )
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">Pembayaran</h1>

          <Button asChild>
            <a href={paymentRoutes.create.url()}>
              + Tambah Pembayaran
            </a>
          </Button>
        </div>

        <div className="flex gap-2 mb-4">
          <input
            type="date"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="border rounded px-3 py-2"
          />
          <input
            type="date"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="border rounded px-3 py-2"
          />
          <Button onClick={applyFilter}>
            Filter
          </Button>
        </div>

        <div className="overflow-x-auto rounded border">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="px-3 py-2 text-left">Kode</th>
                <th className="px-3 py-2">Tanggal</th>
                <th className="px-3 py-2">Penjualan</th>
                <th className="px-3 py-2 text-right">Jumlah</th>
                <th className="px-3 py-2 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {payments.total === 0 && (
                <tr>
                  <td colSpan={5} className="px-3 py-4 text-center text-muted-foreground">
                    Tidak ada data
                  </td>
                </tr>
              )}

              {payments.data.map(payment => (
                <tr key={payment.id} className="border-t">
                  <td className="px-3 py-2">
                    {payment.code}
                  </td>
                  <td className="px-3 py-2 text-center">
                    {payment.payment_date}
                  </td>
                  <td className="px-3 py-2 text-center">
                    {payment.sales.code}
                  </td>
                  <td className="px-3 py-2 text-right">
                    Rp. {new Intl.NumberFormat('id-ID', {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(payment.amount)}
                  </td>
                  <td className="px-3 py-2 text-center space-x-2">
                    <a
                      href={paymentRoutes.show({ payment: payment.id }).url}
                      className="text-blue-600 hover:underline"
                    >
                      Detail
                    </a>
                    <a
                      href={paymentRoutes.edit({ payment: payment.id }).url}
                      className="text-amber-600 hover:underline"
                    >
                      Edit
                    </a>
                    <Button
                      onClick={() => destroy(payment.id)}
                      className="text-red-600 hover:underline bg-white hover:bg-white p-0"
                    >
                      Hapus
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-4">
          <nav className="flex gap-1">
            {payments.links.map((link, index) => (
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

const destroy = (id: number) => {
  if (!confirm('Hapus pembayaran ini?')) return

  router.delete(
    paymentRoutes.destroy({ payment: id }).url,
    { preserveScroll: true }
  )
}
