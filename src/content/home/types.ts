export type Step = {
  label: string;
  system: string;
  state: "done" | "blocked";
};

export type CaseContent = {
  id: string;
  tab: string;
  crumb: string;
  result: "blocked" | "committed";
  who: string;
  avatar: string;
  meta: string;
  message: string;
  typing: string;
  steps: Step[];
  foot: string;
  footSub: string;
  reply: string;
  chip: string;
  chipState: "blocked" | "committed";
};

export type SystemContent = {
  id: string;
  title: string;
  kind: string;
  reading: string;
  readingLabel: string;
  period: string;
  discipline: string;
  scope?: string;
  detail: string;
  bullets: string[];
  stack: string[];
  image?: string;
};

export type NdcContent = {
  search: string;
  searchTitle: string;
  engine: string;
  engineTitle: string;
  opsLabel: string;
  ops: string;
};

export type OssPackage = {
  name: string;
  version: string;
  description: string;
  facts: string[];
  npm: string;
  repo: string;
};

export type ExperienceItem = {
  id: string;
  logo?: string;
  when: string;
  role: string;
  org: string;
  note: string;
  stack?: string[];
  current?: boolean;
};

export type HomeContent = {
  nav: {
    systems: string;
    demo: string;
    trajectory: string;
    menu: string;
    cv: string;
    cvOpen: string;
    email: string;
    language: string;
    spanish: string;
    english: string;
  };
  hero: {
    role: string;
    h1a: string;
    h1b: string;
    sub: string;
    ctaSystems: string;
    ctaEmail: string;
    avail: string;
  };
  panel: {
    brand: string;
    system: string;
    tryAnother: string;
    action: string;
    batchRun: string;
    pill: { running: string; blocked: string; committed: string };
    tabs: { booking: string; flight: string; crm: string };
  };
  systems: {
    title: string;
    builtWith: string;
    ndc: NdcContent;
  };
  openSource: {
    label: string;
    intro: string;
    packages: OssPackage[];
  };
  experience: {
    title: string;
    education: string;
    base: string;
    cvLink: string;
    cvMeta: string;
    items: ExperienceItem[];
  };
  about: {
    lede: string;
    closing: string;
    outside: string;
    stack: string;
  };
  contact: {
    title: string;
    body: string;
    email: string;
    linkedin: string;
    mailSubject: string;
  };
  footer: {
    copy: string;
    work: string;
    profile: string;
    connect: string;
    privacy: string;
    security: string;
    copyEmail: string;
    systems: string;
    openSource: string;
    cv: string;
    writing: string;
  };
  cases: CaseContent[];
  systemsList: SystemContent[];
};
