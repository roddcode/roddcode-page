import { Button } from "@/components/ui/button";
import type { Locale, ProjectSlug } from "@/content/portfolio/types";
import { ArrowUpRight, Braces } from "lucide-react";
import Image from "next/image";
import s from "./project-art.module.css";
import { projectMedia } from "./project-media";

export function ProjectArt({
  slug,
  locale,
  detail = false,
}: {
  slug: ProjectSlug;
  locale: Locale;
  detail?: boolean;
}) {
  const es = locale === "es";
  const resource = projectMedia[slug];

  if (!resource) {
    return (
      <div className={s.projectArt} aria-hidden="true">
        <Braces size={51} strokeWidth={1} />
      </div>
    );
  }

  const { alt, caption } = resource.copy[locale];

  if (resource.kind === "image") {
    return (
      <figure className={s.projectMedia} data-project={slug}>
        <div className={s.projectMediaStage}>
          <Image
            src={resource.image}
            alt={alt}
            fill
            sizes="(max-width: 760px) calc(100vw - 36px), (max-width: 1280px) 45vw, 580px"
            className={s.projectCapture}
          />
          {detail && (
            <Button
              asChild
              variant="link"
              size="sm"
              className={s.captureExpand}
            >
              <a
                href={resource.image.src}
                target="_blank"
                rel="noopener noreferrer"
              >
                {es ? "Ampliar imagen" : "View full image"}
                <ArrowUpRight
                  size={14}
                  aria-hidden="true"
                  className="group-hover/button:translate-x-[2px] group-hover/button:-translate-y-[2px] group-focus-visible/button:translate-x-[2px] group-focus-visible/button:-translate-y-[2px]"
                />
                <span className="sr-only">
                  {es ? " (pestaña nueva)" : " (new tab)"}
                </span>
              </a>
            </Button>
          )}
        </div>
        <figcaption className="sr-only">{caption}</figcaption>
      </figure>
    );
  }

  const Diagram = resource.component;

  return (
    <figure className={s.projectMedia} data-project={slug}>
      <div role="img" aria-label={alt}>
        <Diagram locale={locale} />
      </div>
      <figcaption className="sr-only">{caption}</figcaption>
    </figure>
  );
}
