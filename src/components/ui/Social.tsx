import { SOCIAL } from "@/lib/site";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.9v3h2.6V21h3Z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

const items = [
  { key: "facebook", label: "Facebook", Icon: FacebookIcon },
  { key: "instagram", label: "Instagram", Icon: InstagramIcon },
] as const;

const base =
  "grid h-10 w-10 place-items-center rounded-full border border-cyan/25 text-offwhite/80 transition-all duration-500";

/**
 * Renders a live link when a URL is configured. Social URLs were not supplied with the
 * brief, so until NEXT_PUBLIC_FACEBOOK_URL / NEXT_PUBLIC_INSTAGRAM_URL are set the icon is
 * shown as an inactive placeholder instead of linking to an invented destination.
 */
export function SocialIcons({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-3 ${className}`}>
      {items.map(({ key, label, Icon }) => {
        const href = SOCIAL[key];
        return (
          <li key={key}>
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${label} (opens in a new tab)`}
                className={`${base} hover:-translate-y-0.5 hover:border-cyan hover:bg-cyan/10 hover:text-cyan hover:shadow-[0_0_24px_-4px_var(--color-cyan)]`}
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ) : (
              <span
                role="img"
                aria-label={`${label} (link not yet available)`}
                title={`${label} link coming soon`}
                className={`${base} cursor-not-allowed opacity-45`}
              >
                <Icon className="h-[18px] w-[18px]" />
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
