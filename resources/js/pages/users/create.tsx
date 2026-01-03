import AppLayout from '@/layouts/app-layout'
import UserForm from './partials/user-form'
import users from "@/routes/master/users"

export default function Create() {
  return (
    <AppLayout>
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Tambah User</h1>
        <UserForm submitUrl={users.store().url} />
      </div>
    </AppLayout>
  )
}
