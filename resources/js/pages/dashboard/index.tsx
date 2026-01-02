import { PageProps } from "@/types"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { router } from "@inertiajs/react"

interface Props {
  filters: {
    from: string
    to: string
  }
  widgets: {
    transactions: number
    sales: number
    qty: number
  }
  charts: {
    salesPerMonth: { month: number; total: number }[]
    qtyPerItem: { item: string; total_qty: number }[]
  }
}

export default function Dashboard(
  { filters, widgets, charts }: PageProps<Props>
) {
  const changeDate = (key: 'from' | 'to', value: string) => {
    router.get(route('dashboard'), {
      ...filters,
      [key]: value,
    }, { preserveState: true })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="flex gap-4">
        <input
          type="date"
          value={filters.from}
          onChange={e => changeDate('from', e.target.value)}
          className="input"
        />
        <input
          type="date"
          value={filters.to}
          onChange={e => changeDate('to', e.target.value)}
          className="input"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Widget title="Jumlah Transaksi" value={widgets.transactions} />
        <Widget title="Total Penjualan" value={`Rp ${widgets.sales.toLocaleString()}`} />
        <Widget title="Total Qty Terjual" value={widgets.qty} />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="card">
          <h2 className="font-semibold mb-2">
            Penjualan (Rp) per Bulan
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={charts.salesPerMonth}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h2 className="font-semibold mb-2">
            Qty Terjual per Item
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={charts.qtyPerItem}>
              <XAxis dataKey="item" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total_qty" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

function Widget({ title, value }: { title: string, value: any }) {
  return (
    <div className="card text-center">
      <p className="text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  )
}