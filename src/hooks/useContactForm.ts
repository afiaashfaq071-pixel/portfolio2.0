import { useCallback, useState } from 'react';
import { PROFILE, hasValue } from '../data/profile';

export interface ContactValues {
  name: string;
  email: string;
  message: string;
}

export type FormStatus = 'idle' | 'sending' | 'sent' | 'opened-mail' | 'unconfigured' | 'error';

interface ContactForm {
  status: FormStatus;
  submit: (values: ContactValues) => Promise<void>;
  reset: () => void;
}

/**
 * Delivery order:
 *  1. `formEndpoint` set  → POST the message as JSON (Formspree, Web3Forms, …)
 *  2. `email` set          → open the visitor's mail app with the message pre-filled
 *  3. neither              → tell the visitor honestly that the form isn't connected yet
 */
export function useContactForm(): ContactForm {
  const [status, setStatus] = useState<FormStatus>('idle');

  const submit = useCallback(async (values: ContactValues) => {
    const { email, formEndpoint } = PROFILE.contact;

    if (hasValue(formEndpoint)) {
      setStatus('sending');
      try {
        const response = await fetch(formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(values),
        });
        setStatus(response.ok ? 'sent' : 'error');
      } catch {
        setStatus('error');
      }
      return;
    }

    if (hasValue(email)) {
      const subject = encodeURIComponent(`Portfolio message from ${values.name}`);
      const body = encodeURIComponent(`${values.message}\n\n— ${values.name} (${values.email})`);
      window.location.href = `mailto:${email.trim()}?subject=${subject}&body=${body}`;
      setStatus('opened-mail');
      return;
    }

    setStatus('unconfigured');
  }, []);

  const reset = useCallback(() => setStatus('idle'), []);

  return { status, submit, reset };
}
