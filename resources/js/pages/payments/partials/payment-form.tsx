import { SalePayment } from "@/types";
import { useForm } from "@inertiajs/react";

interface Props {
  sales?: SalePayment[]
  payment?: any
  submitUrl: string
  method?: 'post' | 'put'
}

export default function PaymentForm({
  sales = [],
  payment,
  submitUrl,
  method = 'post',
}: Props) {
  const { data, setData, post, put, processing, errors } = useForm({
    sale_id: payment?.sale_id ?? '',
    payment_date: payment?.payment_date ?? '',
    amount: payment?.amount ?? 0,
  })

  const submit = () => {
    method === 'post' ? post(submitUrl) : put(submitUrl)
  }

  const selectedSale = sales.find(s => s.id === Number(data.sale_id))
  const remaining =
    selectedSale
      ? selectedSale.total_amount - selectedSale.total_paid
      : 0

  return (
    <div className="space-y-6 max-w-lg">
      <div>
        <label>Penjualan</label>
        <select
          className="input"
          value={data.sale_id}
          disabled={method === 'put'}
          onChange={e => setData('sale_id', e.target.value)}
        >
          <option value="">Pilih Penjualan</option>
          {sales.map(sale => (
            <option key={sale.id} value={sale.id}>
              {sale.code} - Sisa: Rp {remaining.toLocaleString()}
            </option>
          ))}
        </select>
        {errors.sale_id && <p className="text-red-500">{errors.sale_id}</p>}
      </div>

      <div>
        <label>Tanggal Pembayaran</label>
        <input
          type="date"
          className="input"
          value={data.payment_date}
          onChange={e => setData('payment_date', e.target.value)}
        />
        {errors.payment_date && <p className="text-red-500">{errors.payment_date}</p>}
      </div>

      <div>
        <label>Nominal Pembayaran</label>
        <input
          type="number"
          min={1}
          max={remaining}
          className="input"
          value={data.amount}
          onChange={e => setData('amount', Number(e.target.value))}
        />
        {selectedSale && (
          <p className="text-sm text-gray-500">
            Sisa pembayaran: Rp {remaining.toLocaleString()}
          </p>
        )}
        {errors.amount && <p className="text-red-500">{errors.amount}</p>}
      </div>

      <button
        onClick={submit}
        disabled={processing}
        className="btn-primary"
      >
        Simpan Pembayaran
      </button>
    </div>
  )
}