import { useForm } from '@inertiajs/react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import InputError from '@/components/input-error'

export default function UserForm(
  { user, submitUrl, method = 'post' }: any
) {
  const { data, setData, post, put, processing, errors } = useForm({
    name: user?.name ?? '',
    email: user?.email ?? '',
    password: '',
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
      <Input
        value={data.name}
        onChange={e => setData('name', e.target.value)}
        placeholder="Nama"
      />
      <InputError message={errors.name} />

      <Input
        value={data.email}
        onChange={e => setData('email', e.target.value)}
        placeholder="Email"
      />
      <InputError message={errors.email} />

      <Input
        type="password"
        value={data.password}
        onChange={e => setData('password', e.target.value)}
        placeholder="Password"
      />
      <InputError message={errors.password} />

      <Button disabled={processing}>
        Simpan
      </Button>
    </form>
  )
}
