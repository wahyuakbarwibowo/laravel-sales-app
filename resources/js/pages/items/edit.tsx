import AppLayout from '@/layouts/app-layout'
import ItemForm from './partials/item-form'
import { PageProps } from '@/types'
import items from "@/routes/master/items"
import { Head } from "@inertiajs/react"

export default function Edit(
  { item }: PageProps<{ item: any }>
) {
  return (
    <AppLayout>
      <Head title="Tambah Item" />
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Tambah Item</h1>
        <ItemForm
          item={item}
          submitUrl={items.update({ item: item.id }).url}
          method="put"
        />
      </div>
    </AppLayout>
  )
}
