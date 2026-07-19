import axios from 'axios'
import React, { useState } from 'react'

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-5 w-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-5 w-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12c1.292 4.338 5.31 7.5 10.066 7.5.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.5a10.522 10.522 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.243L9.88 9.88" />
  </svg>
)

const Login = () => {
  const [formData, setFormData] = useState({ emailId: '', password: '' })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const nextErrors = {}

    if (!formData.emailId.trim()) {
      nextErrors.emailId = 'Email is required'
    }

    if (!formData.password.trim()) {
      nextErrors.password = 'Password is required'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setServerError('')
    if (!validate()) return

    try {
      const res = await axios.post(
        'http://localhost:3000/login',
        formData,
        { withCredentials: true }
      )
      console.log('Login successful:', res.data)
    } catch (error) {
      console.error('Login error:', error)
      setServerError(error?.response?.data || 'Login failed. Please try again.')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0A0A0C] px-4 py-12 sm:px-6">
      <div className="w-full max-w-sm">
        {/* Wordmark */}
        <div className="mb-8 text-center">
          <span className="font-sans text-2xl font-bold tracking-tight text-[#EDEDEF]">
            dev<span className="text-[#5B6EF5]">/</span>tinder
          </span>
        </div>

        {/* Card */}
        <div className="rounded-xl border border-[#2A2B30] bg-[#17181C] p-6 sm:p-8">
          <h1 className="mb-1 text-xl font-semibold text-[#EDEDEF]">Log in</h1>
          <p className="mb-6 text-sm text-[#8B8D98]">Welcome back. Enter your details to continue.</p>

          {serverError && (
            <div className="mb-4 rounded-lg border border-[#F45B69] bg-[#F45B69]/10 px-3.5 py-2.5 text-sm text-[#F45B69]">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="emailId" className="mb-1.5 block text-sm font-medium text-[#EDEDEF]">
                Email
              </label>
              <input
                id="emailId"
                name="emailId"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={formData.emailId}
                onChange={handleChange}
                aria-invalid={Boolean(errors.emailId)}
                aria-describedby={errors.emailId ? 'emailId-error' : undefined}
                className={`w-full rounded-lg border bg-[#0A0A0C] px-3.5 py-2.5 text-sm text-[#EDEDEF] placeholder:text-[#8B8D98] outline-none transition-colors focus:border-[#5B6EF5] focus:ring-1 focus:ring-[#5B6EF5] ${
                  errors.emailId ? 'border-[#F45B69]' : 'border-[#2A2B30]'
                }`}
              />
              {errors.emailId && (
                <p id="emailId-error" className="mt-1.5 text-xs text-[#F45B69]">
                  {errors.emailId}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-[#EDEDEF]">
                  Password
                </label>
                <a href="/forgot-password" className="text-xs font-medium text-[#5B6EF5] hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                  className={`w-full rounded-lg border bg-[#0A0A0C] px-3.5 py-2.5 pr-10 text-sm text-[#EDEDEF] placeholder:text-[#8B8D98] outline-none transition-colors focus:border-[#5B6EF5] focus:ring-1 focus:ring-[#5B6EF5] ${
                    errors.password ? 'border-[#F45B69]' : 'border-[#2A2B30]'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8B8D98] hover:text-[#EDEDEF]"
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              {errors.password && (
                <p id="password-error" className="mt-1.5 text-xs text-[#F45B69]">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="mt-2 w-full rounded-lg bg-[#5B6EF5] py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#5B6EF5] focus:ring-offset-2 focus:ring-offset-[#17181C]"
            >
              Log in
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-[#8B8D98]">
          Don&apos;t have an account?{' '}
          <a href="/signup" className="font-medium text-[#5B6EF5] hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  )
}

export default Login