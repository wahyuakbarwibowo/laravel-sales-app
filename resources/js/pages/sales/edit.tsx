import { BreadcrumbItem, Item, PageProps, Sale } from "@/types";
import SaleForm from "./partials/sale-form";
import sales from "@/routes/sales";
import AppLayout from "@/layouts/app-layout";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Penjualan',
    href: sales.index.url(),
  },
];

export default function Edit({ sale, items }: PageProps<{ sale: Sale; items: Item[] }>) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="p-4 space-y-4">
        <h1 className="text-xl font-bold mb-4">Edit Penjualan</h1>

        {sale.status === 'SUDAH_DIBAYAR' && (
          <p className="text-red-500">Penjualan sudah dibayar dan tidak bisa di-edit</p>
        )}

        <SaleForm
          sale={sale}
          items={items}
          submitUrl={sales.update({ params: { sale: sale.id } }).url}
          method="put"
        />
      </div>
    </AppLayout>
  )
}