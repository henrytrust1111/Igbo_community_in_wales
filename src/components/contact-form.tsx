'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { MaterialIcon } from '@/components/material-icon'

const INQUIRY_TYPES = [
  'General Inquiry',
  'Membership Application',
  'Event Partnership',
  'Volunteer Opportunities',
  'Cultural Heritage Support',
] as const

type FormValues = {
  fullName: string
  email: string
  inquiryType: string
  message: string
  __icw_hp_url: string
}

type SubmitState = { kind: 'idle' } | { kind: 'success' } | { kind: 'error'; message: string }

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormValues>({
    defaultValues: {
      fullName: '',
      email: '',
      inquiryType: '',
      message: '',
      __icw_hp_url: '',
    },
  })
  const [status, setStatus] = useState<SubmitState>({ kind: 'idle' })

  const onSubmit = async (data: FormValues) => {
    setStatus({ kind: 'idle' })
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const payload = (await res.json().catch(() => ({}))) as {
          error?: string
          fieldErrors?: Partial<Record<keyof FormValues, string>>
        }
        if (payload.fieldErrors) {
          for (const [name, msg] of Object.entries(payload.fieldErrors)) {
            if (msg) setError(name as keyof FormValues, { type: 'server', message: msg })
          }
        }
        setStatus({
          kind: 'error',
          message: payload.error ?? 'Something went wrong. Please try again.',
        })
        return
      }

      setStatus({ kind: 'success' })
      reset()
    } catch {
      setStatus({ kind: 'error', message: 'Network error. Please try again.' })
    }
  }

  return (
    <form
      className="grid grid-cols-1 gap-8 md:grid-cols-2"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '-10000px',
          top: 'auto',
          width: 1,
          height: 1,
          overflow: 'hidden',
        }}
      >
        <label>
          Do not fill this field
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            data-1p-ignore
            data-lpignore="true"
            data-form-type="other"
            {...register('__icw_hp_url')}
          />
        </label>
      </div>

      <Field
        label="Full Name"
        error={errors.fullName?.message}
        input={
          <input
            {...register('fullName', {
              required: 'Please enter your full name.',
              minLength: { value: 2, message: 'Please enter your full name.' },
            })}
            type="text"
            placeholder="Enter your name"
            aria-invalid={errors.fullName ? 'true' : 'false'}
            className={fieldClass(Boolean(errors.fullName))}
          />
        }
      />

      <Field
        label="Email Address"
        error={errors.email?.message}
        input={
          <input
            {...register('email', {
              required: 'Please enter your email address.',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address.',
              },
            })}
            type="email"
            placeholder="name@example.com"
            aria-invalid={errors.email ? 'true' : 'false'}
            className={fieldClass(Boolean(errors.email))}
          />
        }
      />

      <Field
        label="Inquiry Type"
        error={errors.inquiryType?.message}
        spanFull
        input={
          <select
            {...register('inquiryType', { required: 'Please choose an inquiry type.' })}
            aria-invalid={errors.inquiryType ? 'true' : 'false'}
            defaultValue=""
            className={fieldClass(Boolean(errors.inquiryType))}
          >
            <option value="" disabled>
              Select an option...
            </option>
            {INQUIRY_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        }
      />

      <Field
        label="Your Message"
        error={errors.message?.message}
        spanFull
        input={
          <textarea
            {...register('message', { required: 'Please write a message.' })}
            rows={6}
            placeholder="How can we assist you today?"
            aria-invalid={errors.message ? 'true' : 'false'}
            className={fieldClass(Boolean(errors.message))}
          />
        }
      />

      <div className="md:col-span-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="group flex items-center gap-2 bg-primary px-10 py-4 font-label-md text-label-md text-on-primary transition-all hover:bg-primary-container disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Sending...' : 'Submit Message'}
          <MaterialIcon
            name="send"
            className="h-5 w-5 transition-transform group-hover:translate-x-1"
          />
        </button>

        {status.kind === 'success' ? (
          <p
            role="status"
            className="mt-4 flex items-center gap-2 font-label-md text-label-md text-primary"
          >
            <MaterialIcon name="check_circle" className="h-5 w-5" />
            Thanks - your message is on its way. We&apos;ll be in touch.
          </p>
        ) : null}
        {status.kind === 'error' ? (
          <p
            role="alert"
            className="mt-4 flex items-center gap-2 font-label-md text-label-md text-red-700"
          >
            <MaterialIcon name="help" className="h-5 w-5" />
            {status.message}
          </p>
        ) : null}
      </div>
    </form>
  )
}

function Field({
  label,
  input,
  error,
  spanFull,
}: {
  label: string
  input: React.ReactNode
  error?: string
  spanFull?: boolean
}) {
  return (
    <label className={`space-y-2 ${spanFull ? 'md:col-span-2' : ''}`}>
      <span className="font-label-md text-label-md text-on-surface-variant">{label}</span>
      {input}
      {error ? (
        <span role="alert" className="block font-label-md text-xs text-red-700">
          {error}
        </span>
      ) : null}
    </label>
  )
}

function fieldClass(hasError: boolean): string {
  const base =
    'w-full border bg-surface p-3 outline-none transition-all focus:ring-2 focus:ring-secondary'
  return hasError
    ? `${base} border-red-600 focus:border-red-600`
    : `${base} border-outline-variant focus:border-secondary`
}
