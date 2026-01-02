import AppLayout from '@/layouts/app-layout'
import ItemForm from './partials/item-form'
import { PageProps } from '@/types'
import items from "@/routes/master/items"

export default function Edit(
  { item }: PageProps<{ item: any }>
) {
  return (
    <AppLayout>
      <ItemForm
        item={item}
        submitUrl={items.update({ item: item.id }).url}
        method="put"
      />
    </AppLayout>
  )
}
