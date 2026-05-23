interface CodeBlockProps {
  code: string;
  lang?: string;
  title?: string;
}

export function CodeBlock({
  code,
  title,
  lang = "TypeScript",
}: CodeBlockProps) {
  return (
    <div className="bg-muted border border-border/50 rounded-sm overflow-hidden w-full">
      {title && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-border/20 bg-muted/80">
          <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
            {title}
          </span>
          <span className="text-[10px] font-mono text-muted-foreground">
            {lang}
          </span>
        </div>
      )}
      <pre className="overflow-x-auto p-4">
        <code className="text-xs font-mono text-secondary-foreground leading-relaxed whitespace-pre">
          {code}
        </code>
      </pre>
    </div>
  );
}
