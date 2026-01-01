import { Item, PageProps, Sale } from "@/types";
import SaleForm from "./partials/sale-form";

export default function Edit({ sale, items }: PageProps<{ sale: Sale; items: Item[] }>) {
  return (
    <>
      <h1 className="text-xl font-bold mb-4">Edit Penjualan</h1>

      {sale.status === 'SUDAH_DIBAYAR' && (
        <p className="text-red-500">Penjualan sudah dibayar dan tidak bisa di-edit</p>
      )}

      <SaleForm
        sale={sale}
        items={items}
        submitUrl={route('sales.update', sale.id)}
        method="put"
      />
    </>
  )
}