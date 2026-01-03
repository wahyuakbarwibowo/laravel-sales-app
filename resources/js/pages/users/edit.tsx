import AppLayout from '@/layouts/app-layout'
import UserForm from './partials/user-form'
import { PageProps, User } from '@/types'
import users from "@/routes/master/users"

export default function Edit(
  { user }: PageProps<{ user: User }>
) {
  return (
    <AppLayout>
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Edit User</h1>
        <UserForm
          user={user}
          submitUrl={users.update({ user: user.id }).url}
          method="put"
        />
      </div>
    </AppLayout>
  )
}
