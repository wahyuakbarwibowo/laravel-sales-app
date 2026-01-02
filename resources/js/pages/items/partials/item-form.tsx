import { useForm } from '@inertiajs/react'

export default function ItemForm(
  { item, submitUrl, method = 'post' }: any
) {
  const { data, setData, post, put, processing, errors } = useForm({
    code: item?.code ?? '',
    name: item?.name ?? '',
    price: item?.price ?? 0,
    image: null,
  })

  const submit = () => {
    method === 'post'
      ? post(submitUrl)
      : put(submitUrl)
  }

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        submit()
      }}
      className="space-y-4"
    >
      <input
        value={data.code}
        onChange={e => setData('code', e.target.value)}
        placeholder="Kode"
        className="input"
      />

      <input
        value={data.name}
        onChange={e => setData('name', e.target.value)}
        placeholder="Nama"
        className="input"
      />

      <input
        type="number"
        value={data.price}
        onChange={e => setData('price', Number(e.target.value))}
        placeholder="Harga"
        className="input"
      />

      <input
        type="file"
        onChange={e => setData('image', e.target.files?.[0])}
      />

      <button disabled={processing} className="btn-primary">
        Simpan
      </button>
    </form>
  )
}
