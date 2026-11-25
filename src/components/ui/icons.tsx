export function Arrow({
  diagonal = false,
  up = false,
}: {
  diagonal?: boolean;
  up?: boolean;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="w-4 h-4 fill-none stroke-current stroke-[1.75] shrink-0"
    >
      {up ? (
        <path d="M12 19V5M7 10L12 5L17 10" />
      ) : diagonal ? (
        <path d="M6 18L18 6M8 6H18V16" />
      ) : (
        <path d="M4 12H19M14 7L19 12L14 17" />
      )}
    </svg>
  );
}

export function MailIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-[1.6]">
      <rect x="2" y="4" width="20" height="16" />
      <polyline points="2,5 12,13 22,5" />
    </svg>
  );
}

export function FileTextIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-[1.6]">
      <polygon points="14,2 4,2 4,22 20,22 20,8" />
      <polyline points="14,2 14,8 20,8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}

export function InstagramIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-[1.6]">
      <rect x="3" y="3" width="18" height="18" />
      <circle cx="12" cy="12" r="4" />
      <rect x="16.5" y="6.5" width="1" height="1" fill="currentColor" />
    </svg>
  );
}

export function LinkedinIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-[1.6]">
      <rect x="3" y="3" width="18" height="18" />
      <line x1="8" y1="11" x2="8" y2="17" />
      <line x1="8" y1="7" x2="8" y2="8.5" />
      <path d="M12 17V11H15.5V17" />
    </svg>
  );
}

export function GithubIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-[1.6]">
      <path d="M9 19C5 20.5 5 16.5 3 16M15 22V18.2C15 17 14.6 16.2 14 15.6C17.2 15.2 20.5 14 20.5 8.6C20.5 7.2 20 5.9 19 4.9C19.4 3.8 19.4 2.6 19 1.5C19 1.5 17.8 1.1 15 3C12.7 2.4 10.3 2.4 8 3C5.2 1.1 4 1.5 4 1.5C3.6 2.6 3.6 3.8 4 4.9C3 5.9 2.5 7.2 2.5 8.6C2.5 14 5.8 15.2 9 15.6C8.4 16.2 8 17 8 18.2V22" />
    </svg>
  );
}

export function SectionLabel({
  index,
  children,
}: {
  index?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4 mb-8 md:mb-10">
      {index && (
        <span className="font-mono-tech text-[11px] font-medium tracking-[0.16em] text-[var(--white-50)]">
          [{index}]
        </span>
      )}
      <span className="w-8 h-px bg-[var(--white-25)]" aria-hidden="true" />
      <span className="font-mono-tech text-[11px] font-medium tracking-[0.16em] uppercase text-[var(--white-60)]">
        {children}
      </span>
    </div>
  );
}
