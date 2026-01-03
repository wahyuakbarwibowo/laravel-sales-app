import AppLayout from '@/layouts/app-layout'
import ItemForm from './partials/item-form'
import items from "@/routes/master/items"
import { Head } from "@inertiajs/react"

export default function Create() {
  return (
    <AppLayout>
      <Head title="Tambah Item" />
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Tambah Item</h1>
        <ItemForm submitUrl={items.store()} />
      </div>
    </AppLayout>
  )
}
