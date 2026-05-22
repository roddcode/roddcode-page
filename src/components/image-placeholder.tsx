interface ImagePlaceholderProps {
  label: string;
  caption?: string;
  className?: string;
}

export function ImagePlaceholder({
  label,
  caption,
  className = "",
}: ImagePlaceholderProps) {
  return (
    <div
      className={`border border-dashed border-border/50 rounded-sm bg-muted/5 flex flex-col items-center justify-center py-16 px-6 select-none ${className}`}
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="text-muted-foreground/30 mb-4"
        aria-hidden
      >
        <title>Placeholder</title>
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
      <span className="text-xs font-mono text-muted-foreground/50 uppercase tracking-widest">
        {label}
      </span>
      {caption && (
        <span className="text-[10px] font-mono text-muted-foreground/30 mt-2">
          {caption}
        </span>
      )}
    </div>
  );
}
