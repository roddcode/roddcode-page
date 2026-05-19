import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center container-site">
      <p className="text-primary font-mono text-sm mb-4">404 ERROR</p>
      <h1 className="text-3xl font-bold tracking-tighter mb-4">Resource not found</h1>
      <p className="text-muted-foreground text-center max-w-md mb-8">
        The requested system resource does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="text-sm font-medium text-background bg-foreground hover:bg-foreground/90 px-6 py-3 transition-all duration-100 ease-out will-change-transform active:scale-[0.98]"
        style={{ borderRadius: "2px" }}
      >
        Return to nominal system
      </Link>
    </div>
  );
}
