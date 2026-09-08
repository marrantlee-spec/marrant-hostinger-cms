import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function IconFrame({ children, ...props }: IconProps) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{children}</svg>;
}

export function ArrowRightIcon(props: IconProps) {
  return <IconFrame {...props}><path d="M4 12h15" /><path d="m14 6 6 6-6 6" /></IconFrame>;
}

export function CaretDownIcon(props: IconProps) {
  return <IconFrame {...props}><path d="m7 10 5 5 5-5" /></IconFrame>;
}

export function CheckCircleIcon(props: IconProps) {
  return <IconFrame {...props}><circle cx="12" cy="12" r="8.5" /><path d="m8.5 12 2.3 2.4 4.8-5" /></IconFrame>;
}

export function GlobeIcon(props: IconProps) {
  return <IconFrame {...props}><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17" /><path d="M12 3.5c2.4 2.3 3.6 5.1 3.6 8.5S14.4 18.2 12 20.5C9.6 18.2 8.4 15.4 8.4 12S9.6 5.8 12 3.5Z" /></IconFrame>;
}

export function PackageIcon(props: IconProps) {
  return <IconFrame {...props}><path d="m3.5 7.2 8.5-4.1 8.5 4.1v9.6L12 20.9l-8.5-4.1V7.2Z" /><path d="m3.5 7.2 8.5 4.1 8.5-4.1M12 11.3v9.6" /></IconFrame>;
}

export function PencilIcon(props: IconProps) {
  return <IconFrame {...props}><path d="m4.2 16.8-.7 3.7 3.7-.7L19.4 7.6a2.1 2.1 0 0 0-3-3L4.2 16.8Z" /><path d="m14.8 6.2 3 3" /></IconFrame>;
}

export function ShieldIcon(props: IconProps) {
  return <IconFrame {...props}><path d="M12 3.2 19 6v5.7c0 4.3-2.9 7.1-7 9.1-4.1-2-7-4.8-7-9.1V6l7-2.8Z" /><path d="m8.7 11.9 2.2 2.2 4.5-4.6" /></IconFrame>;
}

export function WhatsappIcon(props: IconProps) {
  return <IconFrame {...props}><path d="M20 11.7a8 8 0 0 1-11.8 7L4 20l1.3-4.1A8 8 0 1 1 20 11.7Z" /><path d="M9.3 8.4c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.6 1.4c.1.2 0 .5-.1.7l-.4.5c.6 1.2 1.4 2 2.6 2.6l.5-.4c.2-.2.5-.2.7-.1l1.4.6c.3.1.4.3.4.5v.5c0 .3 0 .5-.4.7-.4.2-1.1.4-1.8.2-1.2-.3-2.4-1.1-3.5-2.2s-1.9-2.3-2.2-3.5c-.2-.7 0-1.4.2-1.8Z" /></IconFrame>;
}
