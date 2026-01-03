import { Form, useForm } from '@inertiajs/react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import InputError from "../../../components/input-error"

export default function ItemForm(
  { item, submitUrl, method = 'post' }: any
) {
  const { data, setData, post, put, processing, errors } = useForm({
    code: item?.code ?? '',
    name: item?.name ?? '',
    price: item?.price ?? 0,
    image: null,
  })
  console.log(item, submitUrl, method)

  const submit = () => {
    method === 'post'
      ? post(submitUrl, { forceFormData: true })
      : put(submitUrl, { forceFormData: true })
  }

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        submit()
      }}
      className="space-y-4"
    >
      <Input
        value={data.code}
        onChange={e => setData('code', e.target.value)}
        placeholder="Kode"
        className="input"
      />
      <InputError
        message={errors.code}
      />

      <Input
        value={data.name}
        onChange={e => setData('name', e.target.value)}
        placeholder="Nama"
        className="input"
      />
      <InputError
        message={errors.name}
      />

      <Input
        type="number"
        value={data.price}
        onChange={e => setData('price', Number(e.target.value))}
        placeholder="Harga"
        className="input"
      />
      <InputError
        message={errors.price}
      />

      <Input
        type="file"
        onChange={e => setData('image', e.target.files?.[0])}
      />
      <InputError
        message={errors.image}
      />

      <Button disabled={processing} className="btn-primary" type="submit">
        Simpan
      </Button>
    </form>
  )
}
