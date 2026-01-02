import { PageProps } from '@/types'
import AppLayout from '@/layouts/app-layout'
import { Link } from '@inertiajs/react'
import sales from "@/routes/sales"
import payments from "@/routes/payments"

interface SaleItem {
  id: number
  qty: number
  price: number
  total_price: number
  item: {
    name: string
  }
}

interface Payment {
  id: number
  code: string
  payment_date: string
  amount: number
}

interface Sale {
  id: number
  code: string
  sale_date: string
  status: string
  total_amount: number
  items: SaleItem[]
  payments?: Payment[]
}

export default function Show(
  { sale }: PageProps<{ sale: Sale }>
) {
  const paidTotal =
    sale.payments?.reduce((sum, p) => sum + p.amount, 0) ?? 0

  const remaining = sale.total_amount - paidTotal

  return (
    <AppLayout>
      <div className="p-4 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">
              Detail Penjualan
            </h1>
            <p className="text-gray-500">{sale.code}</p>
          </div>

          <StatusBadge status={sale.status} />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Info label="Tanggal" value={sale.sale_date} />
          <Info label="Total" value={`Rp ${sale.total_amount.toLocaleString()}`} />
          <Info label="Sisa Bayar" value={`Rp ${remaining.toLocaleString()}`} />
        </div>

        <div className="card">
          <h2 className="font-semibold mb-2">Item</h2>

          <table className="table w-full">
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Harga</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>
              {sale.items.map(row => (
                <tr key={row.id}>
                  <td>{row.item.name}</td>
                  <td>{row.qty}</td>
                  <td>Rp {row.price.toLocaleString()}</td>
                  <td>Rp {row.total_price.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {sale.payments && sale.payments.length > 0 && (
          <div className="card">
            <h2 className="font-semibold mb-2">Pembayaran</h2>

            <table className="table w-full">
              <thead>
                <tr>
                  <th>Kode</th>
                  <th>Tanggal</th>
                  <th>Nominal</th>
                </tr>
              </thead>

              <tbody>
                {sale.payments.map(p => (
                  <tr key={p.id}>
                    <td>{p.code}</td>
                    <td>{p.payment_date}</td>
                    <td>Rp {p.amount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex gap-2">
          <Link
            href={sales.index().url}
            className="btn"
          >
            Kembali
          </Link>

          {sale.status !== 'SUDAH_DIBAYAR' && (
            <>
              <Link
                href={sales.edit({ params: { sale: sale.id } }).url}
                className="btn"
              >
                Edit
              </Link>

              <Link
                href={payments.create({ query: { sale_id: sale.id } }).url}
                className="btn-primary"
              >
                Bayar
              </Link>
            </>
          )}
        </div>
      </div>
    </AppLayout>
  )
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="card">
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const map: any = {
    BELUM_DIBAYAR: 'bg-yellow-100 text-yellow-800',
    BELUM_DIBAYAR_SEPENUHNYA: 'bg-orange-100 text-orange-800',
    SUDAH_DIBAYAR: 'bg-green-100 text-green-800',
  }

  return (
    <span className={`px-3 py-1 rounded text-sm ${map[status]}`}>
      {status.replaceAll('_', ' ')}
    </span>
  )
}