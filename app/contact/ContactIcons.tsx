import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true" {...props}>
      <path d="M6.5 17.5 17.5 6.5M9 6.5h8.5V15" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" {...props}>
      <path d="M4.5 12h14M13.5 6.8 18.7 12l-5.2 5.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.55" aria-hidden="true" {...props}>
      <rect x="3.2" y="5.2" width="17.6" height="13.6" rx=".8" />
      <path d="m4 6.4 8 6.5 8-6.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.55" aria-hidden="true" {...props}>
      <path d="M19 10c0 5-7 10.7-7 10.7S5 15 5 10a7 7 0 1 1 14 0Z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.25" />
    </svg>
  );
}

export function WhatsappIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.55" aria-hidden="true" {...props}>
      <path d="M20 11.7a8 8 0 0 1-11.8 7l-4.2 1.1 1.2-4A8 8 0 1 1 20 11.7Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 8.2c.2-.5.4-.5.8-.5h.5c.2 0 .4.1.5.4l.7 1.7c.1.3.1.4-.1.6l-.5.6c.5 1.1 1.3 1.9 2.4 2.4l.6-.5c.2-.2.4-.2.6-.1l1.7.7c.3.1.4.3.4.5v.5c0 .4 0 .6-.5.8-.4.2-1 .3-1.5.1-3-.9-5.4-3.3-6.3-6.3-.2-.5-.1-1.1.1-1.5Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function FactoryIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.35" aria-hidden="true" {...props}>
      <path d="M4 27V13l9 5V13l8 5V7h4v20H4Z" strokeLinejoin="round" />
      <path d="M8 23h2m4 0h2m4 0h2M8 10V5h5v8" strokeLinecap="round" />
    </svg>
  );
}
