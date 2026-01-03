import { PageProps, Payment } from "@/types";
import PaymentForm from "./partials/payment-form";
import AppLayout from "@/layouts/app-layout";
import payments from "@/routes/payments";

export default function Edit(
  { payment }: PageProps<{ payment: Payment }>
) {
  return (
    <AppLayout>
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Tambah Pembayaran</h1>

        <PaymentForm
          payment={payment}
          submitUrl={payments.update({ payment: payment.id }).url}
          method="put"
        />
      </div>
    </AppLayout>
  )
}