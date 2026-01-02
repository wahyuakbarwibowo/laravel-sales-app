import AppLayout from '@/layouts/app-layout'
import ItemForm from './partials/item-form'
import items from "@/routes/master/items"

export default function Create() {
  return (
    <AppLayout>
      <ItemForm submitUrl={items.store().url} />
    </AppLayout>
  )
}
