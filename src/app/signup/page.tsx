import SignupForm from '@/app/ui/signup-form'

export default function SignupPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Create an Account</h1>
        <SignupForm />
      </div>
    </div>
  )
}
