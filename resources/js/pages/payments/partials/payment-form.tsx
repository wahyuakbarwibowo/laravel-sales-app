import { SalePayment } from "@/types";
import { useForm } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import InputError from "@/components/input-error";

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
        <Label className="mr-2">Penjualan</Label>
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
        <InputError
          message={errors.sale_id}
        />
      </div>

      <div>
        <Label>Tanggal Pembayaran</Label>
        <Input
          type="date"
          className="input"
          value={data.payment_date}
          onChange={e => setData('payment_date', e.target.value)}
        />
        <InputError
          message={errors.payment_date}
        />
      </div>

      <div>
        <Label>Nominal Pembayaran</Label>
        <Input
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
        <InputError
          message={errors.amount}
        />
      </div>

      <Button
        onClick={submit}
        disabled={processing}
        className="btn-primary"
      >
        Simpan Pembayaran
      </Button>
    </div>
  )
}