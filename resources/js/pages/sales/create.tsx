import { BreadcrumbItem, Item, PageProps } from "@/types";
import SaleForm from "./partials/sale-form";
import sales from "@/routes/sales";
import AppLayout from "@/layouts/app-layout";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Penjualan',
    href: sales.index.url(),
  }
];

export default function Create({ items }: PageProps<{ items: Item[] }>) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="p-4 space-y-4">
        <h1 className="text-xl font-bold mb-4">Tambah Penjualan</h1>
        <SaleForm
          items={items}
          submitUrl={sales.store().url}
        />
      </div>
    </AppLayout>
  )
}