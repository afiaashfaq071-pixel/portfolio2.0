import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Send } from 'lucide-react';
import { useContactForm, type ContactValues, type FormStatus } from '../hooks/useContactForm';
import { Button } from './Button';
import { cn } from '../lib/cn';

type Errors = Partial<Record<keyof ContactValues, string>>;

const EMPTY: ContactValues = { name: '', email: '', message: '' };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: ContactValues): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = 'Please enter your name.';
  if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'Please enter a valid email address.';
  if (values.message.trim().length < 10) errors.message = 'Please write a message of at least 10 characters.';
  return errors;
}

const STATUS_COPY: Record<Exclude<FormStatus, 'idle' | 'sending'>, { tone: 'good' | 'warn'; text: string }> = {
  sent: { tone: 'good', text: 'Message sent — thank you! I will get back to you soon.' },
  'opened-mail': {
    tone: 'good',
    text: 'Your email app should have opened with the message ready to send.',
  },
  unconfigured: {
    tone: 'warn',
    text: "This form isn't connected to an email address yet, so nothing was sent. Please reach out through GitHub for now.",
  },
  error: { tone: 'warn', text: 'Something went wrong while sending. Please try again in a moment.' },
};

const FIELD =
  'w-full rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3.5 text-base text-white placeholder:text-white/30 transition-colors focus:border-ember focus:bg-white/[0.06] focus:outline-none';

export function ContactForm() {
  const [values, setValues] = useState<ContactValues>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const { status, submit, reset } = useContactForm();

  const onChange =
    (field: keyof ContactValues) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((current) => ({ ...current, [field]: event.target.value }));
      if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
      if (status !== 'idle' && status !== 'sending') reset();
    };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    await submit(values);
  };

  const feedback = status === 'idle' || status === 'sending' ? null : STATUS_COPY[status];

  return (
    <form id="contact-form" onSubmit={onSubmit} noValidate className="glass scroll-mt-28 rounded-3xl p-6 md:p-8">
      <div className="grid gap-5">
        <div>
          <label htmlFor="cf-name" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
            Your name
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={onChange('name')}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? 'cf-name-error' : undefined}
            className={cn(FIELD, errors.name && 'border-red-400/70')}
            placeholder="Abdul Khaliq"
          />
          {errors.name && (
            <p id="cf-name-error" className="mt-2 text-sm text-red-300">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="cf-email" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
            Your email
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={values.email}
            onChange={onChange('email')}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? 'cf-email-error' : undefined}
            className={cn(FIELD, errors.email && 'border-red-400/70')}
            placeholder="you@example.com"
          />
          {errors.email && (
            <p id="cf-email-error" className="mt-2 text-sm text-red-300">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="cf-message" className="mb-2 block font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
            Message
          </label>
          <textarea
            id="cf-message"
            name="message"
            rows={5}
            value={values.message}
            onChange={onChange('message')}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? 'cf-message-error' : undefined}
            className={cn(FIELD, 'resize-y', errors.message && 'border-red-400/70')}
            placeholder="Tell me about your idea…"
          />
          {errors.message && (
            <p id="cf-message-error" className="mt-2 text-sm text-red-300">
              {errors.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Button type="submit" disabled={status === 'sending'} icon={<Send size={16} />}>
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </Button>

          <p
            role="status"
            aria-live="polite"
            className={cn(
              'text-sm sm:max-w-xs',
              feedback?.tone === 'good' ? 'text-emerald-300' : 'text-amber-300',
            )}
          >
            {feedback?.text}
          </p>
        </div>
      </div>
    </form>
  );
}
