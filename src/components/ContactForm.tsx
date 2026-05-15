'use client';

import { useTranslations } from 'next-intl';
import { useForm, type UseFormRegisterReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { CheckCircle2, AlertCircle, Send } from 'lucide-react';
import { MotionSection } from './MotionSection';

type FormData = {
  name: string;
  contact: string;
  question: string;
};

export function ContactForm() {
  const t = useTranslations('Contact');
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const schema = z.object({
    name: z.string().min(2, t('errors.nameRequired')),
    contact: z.string().min(3, t('errors.contactRequired')),
    question: z.string().min(10, t('errors.questionRequired')),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setSubmitError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'Request failed');
      }
      setSubmitted(true);
      reset();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  return (
    <MotionSection id="consultation" className="section-padding">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {t('sectionTitle')}
          </h2>
          <p className="mt-4 text-base text-slate-400 sm:text-lg">
            {t('sectionSubtitle')}
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-slate-900 to-slate-950 p-6 shadow-2xl sm:p-10">
          {submitted ? (
            <div className="flex flex-col items-center py-8 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15">
                <CheckCircle2 size={48} className="text-emerald-400" />
              </div>
              <h3 className="mt-6 text-2xl font-bold">{t('successTitle')}</h3>
              <p className="mt-3 max-w-md text-slate-400">
                {t('successMessage')}
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-8 rounded-full border border-white/15 bg-white/5 px-6 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-white/10"
              >
                {t('submitAnother')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5 sm:grid-cols-2">
              <Field
                label={t('fields.name')}
                placeholder={t('fields.namePlaceholder')}
                error={errors.name?.message}
                registration={register('name')}
              />
              <Field
                label={t('fields.contact')}
                placeholder={t('fields.contactPlaceholder')}
                error={errors.contact?.message}
                registration={register('contact')}
              />
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  {t('fields.question')}
                </label>
                <textarea
                  rows={4}
                  placeholder={t('fields.questionPlaceholder')}
                  {...register('question')}
                  className={`w-full resize-none rounded-xl border bg-white/5 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 transition focus:bg-white/7 focus:outline-none ${
                    errors.question
                      ? 'border-red-500/60 focus:border-red-500'
                      : 'border-white/10 focus:border-emerald-500/50'
                  }`}
                />
                {errors.question && (
                  <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
                    <AlertCircle size={12} />
                    {errors.question.message}
                  </p>
                )}
              </div>

              {submitError && (
                <p className="flex items-center gap-1.5 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300 sm:col-span-2">
                  <AlertCircle size={16} />
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-8 py-4 text-base font-semibold text-slate-950 transition hover:bg-emerald-400 hover:shadow-2xl hover:shadow-emerald-500/40 disabled:opacity-60 sm:col-span-2"
              >
                {isSubmitting ? (
                  t('submitting')
                ) : (
                  <>
                    <Send size={18} />
                    {t('submit')}
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </MotionSection>
  );
}

type FieldProps = {
  label: string;
  placeholder?: string;
  error?: string;
  registration: UseFormRegisterReturn;
};

function Field({ label, placeholder, error, registration }: FieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        {...registration}
        className={`w-full rounded-xl border bg-white/5 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 transition focus:bg-white/7 focus:outline-none ${
          error
            ? 'border-red-500/60 focus:border-red-500'
            : 'border-white/10 focus:border-emerald-500/50'
        }`}
      />
      {error && (
        <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
          <AlertCircle size={12} />
          {error}
        </p>
      )}
    </div>
  );
}
