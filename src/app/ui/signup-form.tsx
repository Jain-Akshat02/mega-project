'use client'

import { signup } from '@/app/actions/auth'
import { useActionState } from 'react'

export default function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined)

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Create an Account
        </h1>

        <form action={action} className="space-y-5">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              placeholder="Your name"
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500"
            />
            {state?.errors?.name && (
              <p className="mt-1 text-sm text-red-600">{state.errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500"
            />
            {state?.errors?.email && (
              <p className="mt-1 text-sm text-red-600">{state.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="********"
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500"
            />
            {state?.errors?.password && (
              <ul className="mt-1 list-disc pl-5 text-sm text-red-600">
                {state.errors.password.map((err) => (
                  <li key={err}>{err}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Submit */}
          <button
            disabled={pending}
            type="submit"
            className="w-full rounded-lg bg-indigo-600 py-2 text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-400"
          >
            {pending ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        {state?.message && (
          <p className="mt-4 text-center text-sm text-red-600">
            {state.message}
          </p>
        )}
      </div>
    </div>
  )
}
