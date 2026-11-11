export type Locale = "es" | "en";
export type ProjectSlug = "soffia" | "ndc" | "meteor";

export type Evidence = { label: string; detail: string; href?: string };
export type Project = {
  slug: ProjectSlug;
  title: string;
  category: string;
  summary: string;
  period: string;
  role: string;
  scope: string;
  status: string;
  stack: string[];
  context: string[];
  contribution: string[];
  constraints: string[];
  decisions: { title: string; choice: string; tradeoff: string }[];
  flow: { title: string; detail: string }[];
  incident: {
    title: string;
    detail: string;
    handling: string;
    limitation: string;
  };
  results: {
    title: string;
    detail: string;
    provenance: string;
    limitation: string;
  };
  evidence: Evidence[];
  learning: string[];
};

export type Package = {
  name: "reactive-fsm" | "exactly-once";
  version: string;
  summary: string;
  problem: string;
  contract: string;
  example: string;
  limits: string[];
  tests: string;
  consumers: string;
  repo: string;
  npm: string;
  evidence: Evidence[];
};

export type PortfolioContent = {
  identity: { name: string; role: string; intro: string; location: string };
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
