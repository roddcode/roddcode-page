import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-site flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="mb-4 font-mono text-sm text-primary">404</p>
      <h1 className="mb-4 font-sans text-3xl font-medium tracking-tight">
        Esta página no existe.
      </h1>
      <p className="mb-8 max-w-md text-secondary-foreground">
        El enlace está roto o la página se movió.
      </p>
      <Link
        href="/"
        className="bg-primary px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-primary/90"
        style={{ borderRadius: 2 }}
      >
        Volver al inicio
      </Link>
    </div>
  );
}
