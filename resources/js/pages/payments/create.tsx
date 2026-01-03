import { PageProps, SalePayment } from "@/types";
import PaymentForm from "./partials/payment-form";
import payments from "@/routes/payments";
import AppLayout from "../../layouts/app-layout";

export default function Create(
  { sales }: PageProps<{ sales: SalePayment[] }>
) {
  return (
    <AppLayout>
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Tambah Pembayaran</h1>

        <PaymentForm
          sales={sales}
          submitUrl={payments.store().url}
        />
      </div>
    </AppLayout>
  )
}