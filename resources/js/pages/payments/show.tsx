import { PageProps, Payment } from '@/types'
import { Button } from '@/components/ui/button'
import payments from "@/routes/payments"

export default function Show(
  { payment }: PageProps<{ payment: Payment }>
) {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">
          Detail Pembayaran
        </h1>

        <Button asChild variant="secondary">
          <a href={payments.index().url}>
            Kembali
          </a>
        </Button>
      </div>

      <div className="rounded border p-4 max-w-xl space-y-3">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Kode Pembayaran</span>
          <span className="font-medium">{payment.code}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Tanggal Bayar</span>
          <span>{payment.payment_date}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Penjualan</span>
          <span>{payment.sale.code}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Jumlah</span>
          <span className="font-semibold">
            {payment.amount.toLocaleString('id-ID')}
          </span>
        </div>
      </div>
    </>
  )
}
