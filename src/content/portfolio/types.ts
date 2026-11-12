export type Locale = "es" | "en";
export type ProjectSlug = string;

export type ProjectDelivery = {
  ndcOperations: number;
  migratedRepositories: number;
};

export type Project = {
  slug: ProjectSlug;
  title: string;
  category: string;
  summary: string;
  period: string;
  role: string;
  scope: string;
  status: "draft" | "published";
  availability: string;
  featured: boolean;
  stack: string[];
  delivery?: ProjectDelivery;
  highlights?: { label: string; value: string; context?: string }[];
  relatedPosts?: string[];
  relatedPackages?: { name: string; relationship: "used" | "related" }[];
};

export type Package = {
  name: "reactive-fsm" | "exactly-once";
  version: string;
  summary: string;
  repo: string;
  npm: string;
};

export type PortfolioContent = {
  identity: {
    name: string;
    role: string;
    headline: string;
    intro: string;
    location: string;
  };
  projects: Project[];
  packages: Package[];
  about: {
    intro: string;
    paragraphs: string[];
    education: string;
    method: string[];
    timeline: {
      period: string;
      role: string;
      organization: string;
      detail: string;
      stack: string[];
    }[];
  };
};
