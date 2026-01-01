import { Item, PageProps } from "@/types";
import SaleForm from "./partials/sale-form";

export default function Create({ items }: PageProps<{ items: Item[] }>) {
  return (
    <>
      <h1 className="text-xl font-bold mb-4">Tambah Penjualan</h1>
      <SaleForm
        items={items}
        submitUrl={route('sales.store')}
      />
    </>
  )
}