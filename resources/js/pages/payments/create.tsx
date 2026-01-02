import { PageProps, SalePayment } from "@/types";
import PaymentForm from "./partials/payment-form";

export default function Create(
  { sales }: PageProps<{ sales: SalePayment[] }>
) {
  return (
    <>
      <h1 className="text-xl font-bold mb-4">Tambah Pembayaran</h1>

      <PaymentForm
        sales={sales}
        submitUrl={route('payments.store')}
      />
    </>
  )
}