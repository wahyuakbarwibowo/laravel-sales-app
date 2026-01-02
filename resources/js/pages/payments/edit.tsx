import { PageProps, Payment } from "@/types";
import PaymentForm from "./partials/payment-form";

export default function Edit(
  { payment }: PageProps<{ payment: Payment }>
) {
  return (
    <>
      <h1 className="text-xl font-bold mb-4">Tambah Pembayaran</h1>

      <PaymentForm
        payment={payment}
        submitUrl={route('payments.update', payment.id)}
        method="put"
      />
    </>
  )
}