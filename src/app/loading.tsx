export default function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="flex items-center gap-2 text-zinc-500 font-mono text-sm">
        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" />
        <span>Loading system resources...</span>
      </div>
    </div>
  );
}
