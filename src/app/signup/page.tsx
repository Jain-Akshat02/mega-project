import SignupForm from '@/app/ui/signup-form'

export default function SignupPage() {
  return (
    <div className="flex justify-center items-center min-h-screen min-w-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">

        <SignupForm />

      </div>
    </div>
  )
}
