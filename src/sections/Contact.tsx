import type { ReactNode } from 'react';
import { Mail } from 'lucide-react';
import {
  PROFILE,
  getEmailHref,
  getInstagramHref,
  getPhoneHref,
  hasValue,
} from '../data/profile';
import { Reveal } from '../animations/Reveal';
import { Container } from '../components/Container';
import { GitHubIcon, InstagramIcon } from '../components/BrandIcons';
import { LinkButton } from '../components/Button';
import { ContactForm } from '../components/ContactForm';
import { Magnetic } from '../components/Magnetic';
import { SectionHeading } from '../components/SectionHeading';

function Placeholder({ text }: { text: string }) {
  return (
    <span className="inline-flex flex-wrap items-center gap-3 text-white/45">
      {text}
      <span className="rounded-full border border-ember/50 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-ember">
        Placeholder
      </span>
    </span>
  );
}

function InfoRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-1 border-b border-line py-4 sm:grid-cols-[8.5rem_1fr] sm:items-baseline sm:gap-6">
      <dt className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">{label}</dt>
      <dd className="min-w-0 break-words text-base md:text-lg">{children}</dd>
    </div>
  );
}

const linkClass = 'underline decoration-white/30 underline-offset-4 transition-colors hover:text-ember hover:decoration-ember';

export function Contact() {
  const { email, phone } = PROFILE.contact;
  const instagramHref = getInstagramHref();
  const phoneHref = getPhoneHref();
  const githubLabel = PROFILE.socials.github.replace(/^https?:\/\//, '');

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative py-24 md:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5"
        style={{ background: 'radial-gradient(60% 60% at 50% 100%, rgb(232 184 109 / 0.09), transparent)' }}
      />

      <Container className="relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeading
              id="contact-title"
              eyebrow="05 — Contact"
              title="Let's build something worth remembering."
              accent={['remembering']}
              description="Have an idea, a project or an opportunity? I'd love to hear about it."
            />

            <Reveal delay={0.1} className="mt-10">
              <dl className="border-t border-line">
                <InfoRow label="Name">{PROFILE.name}</InfoRow>
                <InfoRow label="Role">{PROFILE.role}</InfoRow>
                <InfoRow label="Education">{PROFILE.education}</InfoRow>
                <InfoRow label="Email">
                  {hasValue(email) ? (
                    <a href={getEmailHref()} className={linkClass}>
                      {email}
                    </a>
                  ) : (
                    <Placeholder text="your.email@example.com" />
                  )}
                </InfoRow>
                <InfoRow label="Phone">
                  {hasValue(phone) ? (
                    <a href={phoneHref} className={linkClass}>
                      {phone}
                    </a>
                  ) : (
                    <Placeholder text="+00 000 0000000" />
                  )}
                </InfoRow>
                <InfoRow label="GitHub">
                  <a href={PROFILE.socials.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {githubLabel}
                  </a>
                </InfoRow>
                <InfoRow label="Instagram">
                  {instagramHref ? (
                    <a href={instagramHref} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      {PROFILE.socials.instagram.replace(/^https?:\/\/(www\.)?instagram\.com\//i, '@').replace(/\/$/, '')}
                    </a>
                  ) : (
                    <Placeholder text="@your_username" />
                  )}
                </InfoRow>
              </dl>
            </Reveal>

            <Reveal delay={0.15} className="mt-10 flex flex-wrap items-center gap-3">
              <Magnetic>
                <LinkButton href={getEmailHref()} icon={<Mail size={18} />}>
                  Email me
                </LinkButton>
              </Magnetic>
              <Magnetic>
                <LinkButton
                  href={PROFILE.socials.github}
                  external
                  variant="outline"
                  icon={<GitHubIcon className="size-[18px]" />}
                >
                  GitHub
                </LinkButton>
              </Magnetic>
              {instagramHref && (
                <Magnetic>
                  <LinkButton
                    href={instagramHref}
                    external
                    variant="outline"
                    icon={<InstagramIcon className="size-[18px]" />}
                  >
                    Instagram
                  </LinkButton>
                </Magnetic>
              )}
            </Reveal>
          </div>

          <Reveal delay={0.2} className="lg:col-span-6">
            <ContactForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
