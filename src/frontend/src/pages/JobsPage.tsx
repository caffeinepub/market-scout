import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Briefcase,
  Building2,
  ExternalLink,
  MapPin,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Data ─────────────────────────────────────────────────────────────────────

export const suggestedCompanies = [
  "OpenAI",
  "Google",
  "Amazon",
  "Microsoft",
  "Apple",
  "Meta",
  "Tesla",
  "Netflix",
  "Nvidia",
  "Stripe",
  "Anthropic",
  "Mistral",
  "Salesforce",
  "Adobe",
  "Spotify",
  "Uber",
  "Airbnb",
  "Twitter",
  "LinkedIn",
  "Shopify",
  "Palantir",
  "Databricks",
  "Snowflake",
  "Figma",
  "Notion",
];

export const mockResults: Record<
  string,
  Array<{
    id: number;
    title: string;
    location: string;
    jobType: string;
    audience: "Working Professional" | "Student";
    sector: string;
  }>
> = {
  OpenAI: [
    {
      id: 1,
      title: "Research Scientist",
      location: "San Francisco, CA",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
    {
      id: 2,
      title: "AI Research Intern",
      location: "Remote",
      jobType: "Internship",
      audience: "Student",
      sector: "Technology",
    },
  ],
  Google: [
    {
      id: 3,
      title: "Senior Software Engineer",
      location: "Mountain View, CA",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
    {
      id: 4,
      title: "Software Engineering Intern",
      location: "New York, NY",
      jobType: "Internship",
      audience: "Student",
      sector: "Technology",
    },
  ],
  Amazon: [
    {
      id: 5,
      title: "Operations Manager",
      location: "Seattle, WA",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "E-Commerce",
    },
    {
      id: 6,
      title: "Business Analyst Intern",
      location: "Seattle, WA",
      jobType: "Internship",
      audience: "Student",
      sector: "E-Commerce",
    },
  ],
  Microsoft: [
    {
      id: 7,
      title: "Product Manager",
      location: "Redmond, WA",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
    {
      id: 8,
      title: "Research Intern",
      location: "Remote",
      jobType: "Internship",
      audience: "Student",
      sector: "Technology",
    },
  ],
  Apple: [
    {
      id: 9,
      title: "iOS Engineer",
      location: "Cupertino, CA",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
    {
      id: 10,
      title: "Hardware Engineering Intern",
      location: "Cupertino, CA",
      jobType: "Internship",
      audience: "Student",
      sector: "Technology",
    },
  ],
  Meta: [
    {
      id: 11,
      title: "Data Scientist",
      location: "Menlo Park, CA",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Social Media",
    },
    {
      id: 12,
      title: "AR/VR Research Intern",
      location: "Remote",
      jobType: "Internship",
      audience: "Student",
      sector: "Social Media",
    },
  ],
  Tesla: [
    {
      id: 13,
      title: "Mechanical Engineer",
      location: "Austin, TX",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Automotive",
    },
    {
      id: 14,
      title: "Energy Engineering Intern",
      location: "Fremont, CA",
      jobType: "Internship",
      audience: "Student",
      sector: "Automotive",
    },
  ],
  Netflix: [
    {
      id: 15,
      title: "Content Strategy Manager",
      location: "Los Gatos, CA",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Entertainment",
    },
    {
      id: 16,
      title: "Data Analytics Intern",
      location: "Remote",
      jobType: "Internship",
      audience: "Student",
      sector: "Entertainment",
    },
  ],
  Nvidia: [
    {
      id: 17,
      title: "GPU Systems Engineer",
      location: "Santa Clara, CA",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
    {
      id: 18,
      title: "Deep Learning Intern",
      location: "Santa Clara, CA",
      jobType: "Internship",
      audience: "Student",
      sector: "Technology",
    },
  ],
  Stripe: [
    {
      id: 19,
      title: "Backend Engineer",
      location: "San Francisco, CA",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Fintech",
    },
    {
      id: 20,
      title: "Engineering Intern",
      location: "Remote",
      jobType: "Internship",
      audience: "Student",
      sector: "Fintech",
    },
  ],
  Anthropic: [
    {
      id: 21,
      title: "Safety Researcher",
      location: "San Francisco, CA",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
    {
      id: 22,
      title: "Research Intern",
      location: "San Francisco, CA",
      jobType: "Internship",
      audience: "Student",
      sector: "Technology",
    },
  ],
  Mistral: [
    {
      id: 23,
      title: "ML Engineer",
      location: "Paris, France",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
    {
      id: 24,
      title: "Research Intern",
      location: "Remote",
      jobType: "Internship",
      audience: "Student",
      sector: "Technology",
    },
  ],
  Salesforce: [
    {
      id: 25,
      title: "Cloud Solutions Architect",
      location: "San Francisco, CA",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
    {
      id: 26,
      title: "Software Engineering Intern",
      location: "Multiple Locations",
      jobType: "Internship",
      audience: "Student",
      sector: "Technology",
    },
  ],
  Adobe: [
    {
      id: 27,
      title: "UX Designer",
      location: "San Jose, CA",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
    {
      id: 28,
      title: "Design Intern",
      location: "San Jose, CA",
      jobType: "Internship",
      audience: "Student",
      sector: "Technology",
    },
  ],
  Spotify: [
    {
      id: 29,
      title: "Machine Learning Engineer",
      location: "Remote",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
    {
      id: 30,
      title: "Data Science Intern",
      location: "New York, NY",
      jobType: "Internship",
      audience: "Student",
      sector: "Technology",
    },
  ],
  Uber: [
    {
      id: 31,
      title: "Product Manager",
      location: "San Francisco, CA",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Transportation",
    },
    {
      id: 32,
      title: "Engineering Intern",
      location: "Remote",
      jobType: "Internship",
      audience: "Student",
      sector: "Transportation",
    },
  ],
  Airbnb: [
    {
      id: 33,
      title: "Frontend Engineer",
      location: "San Francisco, CA",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Travel",
    },
    {
      id: 34,
      title: "UX Design Intern",
      location: "San Francisco, CA",
      jobType: "Internship",
      audience: "Student",
      sector: "Travel",
    },
  ],
  Twitter: [
    {
      id: 35,
      title: "Platform Engineer",
      location: "San Francisco, CA",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Social Media",
    },
    {
      id: 36,
      title: "Software Engineering Intern",
      location: "Remote",
      jobType: "Internship",
      audience: "Student",
      sector: "Social Media",
    },
  ],
  LinkedIn: [
    {
      id: 37,
      title: "Data Engineer",
      location: "Sunnyvale, CA",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
    {
      id: 38,
      title: "Product Intern",
      location: "Sunnyvale, CA",
      jobType: "Internship",
      audience: "Student",
      sector: "Technology",
    },
  ],
  Shopify: [
    {
      id: 39,
      title: "Commerce Engineer",
      location: "Remote",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "E-Commerce",
    },
    {
      id: 40,
      title: "Engineering Intern",
      location: "Remote",
      jobType: "Internship",
      audience: "Student",
      sector: "E-Commerce",
    },
  ],
  Palantir: [
    {
      id: 41,
      title: "Forward Deployed Engineer",
      location: "New York, NY",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
    {
      id: 42,
      title: "Software Engineering Intern",
      location: "New York, NY",
      jobType: "Internship",
      audience: "Student",
      sector: "Technology",
    },
  ],
  Databricks: [
    {
      id: 43,
      title: "Solutions Engineer",
      location: "San Francisco, CA",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
    {
      id: 44,
      title: "Engineering Intern",
      location: "Remote",
      jobType: "Internship",
      audience: "Student",
      sector: "Technology",
    },
  ],
  Snowflake: [
    {
      id: 45,
      title: "Cloud Infrastructure Engineer",
      location: "San Mateo, CA",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
    {
      id: 46,
      title: "Software Engineering Intern",
      location: "Remote",
      jobType: "Internship",
      audience: "Student",
      sector: "Technology",
    },
  ],
  Figma: [
    {
      id: 47,
      title: "Product Designer",
      location: "San Francisco, CA",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
    {
      id: 48,
      title: "Design Intern",
      location: "Remote",
      jobType: "Internship",
      audience: "Student",
      sector: "Technology",
    },
  ],
  Notion: [
    {
      id: 49,
      title: "Growth Engineer",
      location: "San Francisco, CA",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
    {
      id: 50,
      title: "Software Engineering Intern",
      location: "Remote",
      jobType: "Internship",
      audience: "Student",
      sector: "Technology",
    },
  ],
};

type Audience = "All" | "Working Professional" | "Student";

interface Job {
  id: number;
  company: string;
  title: string;
  location: string;
  jobType: string;
  audience: "Working Professional" | "Student";
  sector: string;
}

// Build JOBS from mockResults so all 25 companies are represented
const JOBS: Job[] = Object.entries(mockResults).flatMap(([company, roles]) =>
  roles.map((role) => ({
    id: role.id,
    company,
    title: role.title,
    location: role.location,
    jobType: role.jobType,
    audience: role.audience,
    sector: role.sector,
  })),
);

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getInitials(company: string): string {
  const words = company.split(/[\s&]+/).filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return words
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function getSectorColor(sector: string): string {
  const map: Record<string, string> = {
    Technology: "bg-primary/10 text-primary border-primary/20",
    Finance: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    Healthcare: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    "E-Commerce": "bg-amber-500/10 text-amber-400 border-amber-500/20",
    Automotive: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    Consulting: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    Entertainment: "bg-pink-500/10 text-pink-400 border-pink-500/20",
    "Social Media": "bg-sky-500/10 text-sky-400 border-sky-500/20",
    Travel: "bg-teal-500/10 text-teal-400 border-teal-500/20",
  };
  return map[sector] ?? "bg-muted/20 text-muted-foreground border-border";
}

function getCompanyGradient(company: string): string {
  const hash = company.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const gradients = [
    "from-primary/30 to-primary/10",
    "from-emerald-500/30 to-emerald-500/10",
    "from-violet-500/30 to-violet-500/10",
    "from-amber-500/30 to-amber-500/10",
    "from-rose-500/30 to-rose-500/10",
    "from-sky-500/30 to-sky-500/10",
    "from-orange-500/30 to-orange-500/10",
    "from-teal-500/30 to-teal-500/10",
  ];
  return gradients[hash % gradients.length];
}

// ─── Job Card ─────────────────────────────────────────────────────────────────

interface JobCardProps {
  job: Job;
  index: number;
}

function JobCard({ job, index }: JobCardProps) {
  const handleApply = () => {
    toast.success(`Application started for ${job.title} at ${job.company}!`, {
      description: "You will be redirected to the company careers page.",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="group rounded-xl border border-border bg-card/60 hover:bg-card/90 hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col"
    >
      {/* Card header */}
      <div className="p-5 flex items-start gap-4">
        {/* Company badge */}
        <div
          className={`w-11 h-11 rounded-xl bg-gradient-to-br ${getCompanyGradient(job.company)} border border-border flex items-center justify-center flex-shrink-0`}
        >
          <span className="text-foreground font-display font-bold text-xs tracking-wide">
            {getInitials(job.company)}
          </span>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <p className="text-xs font-semibold text-muted-foreground truncate">
              {job.company}
            </p>
            <span
              className={`flex-shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                job.audience === "Student"
                  ? "bg-sky-500/10 text-sky-400 border-sky-500/20"
                  : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
              }`}
            >
              {job.audience === "Student" ? "Student" : "Professional"}
            </span>
          </div>
          <h3 className="font-display font-semibold text-sm text-foreground leading-snug line-clamp-2">
            {job.title}
          </h3>
        </div>
      </div>

      {/* Meta */}
      <div className="px-5 pb-4 flex flex-col gap-2 flex-1">
        <div className="flex flex-wrap gap-2">
          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getSectorColor(job.sector)}`}
          >
            {job.sector}
          </span>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full border bg-muted/20 text-muted-foreground border-border">
            {job.jobType}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin size={11} className="flex-shrink-0 text-primary/60" />
          <span className="truncate">{job.location}</span>
        </div>
      </div>

      {/* Apply button */}
      <div className="px-5 pb-5">
        <Button
          size="sm"
          onClick={handleApply}
          className="w-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 hover:border-primary/40 font-semibold text-xs tracking-wide transition-all duration-200 group-hover:bg-primary/15"
        >
          <ExternalLink size={12} className="mr-1.5" />
          Apply Now
        </Button>
      </div>
    </motion.div>
  );
}

// ─── Filter Tabs ──────────────────────────────────────────────────────────────

interface FilterTabsProps {
  active: Audience;
  onChange: (a: Audience) => void;
  counts: Record<Audience, number>;
}

const AUDIENCE_FILTERS: Audience[] = ["All", "Working Professional", "Student"];

function FilterTabs({ active, onChange, counts }: FilterTabsProps) {
  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {AUDIENCE_FILTERS.map((audience) => (
        <button
          key={audience}
          type="button"
          onClick={() => onChange(audience)}
          className={`flex items-center gap-1.5 flex-shrink-0 px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 ${
            active === audience
              ? "bg-primary/15 border border-primary/40 text-primary"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/40 border border-transparent"
          }`}
          aria-pressed={active === audience}
        >
          {audience === "Working Professional" ? (
            <>
              <Briefcase size={11} />
              Professional
            </>
          ) : audience === "Student" ? (
            <>
              <Building2 size={11} />
              Student
            </>
          ) : (
            "All"
          )}
          <span
            className={`ml-0.5 text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
              active === audience
                ? "bg-primary/20 text-primary"
                : "bg-muted/40 text-muted-foreground"
            }`}
          >
            {counts[audience]}
          </span>
        </button>
      ))}
    </div>
  );
}

// ─── Company Strip ────────────────────────────────────────────────────────────

interface CompanyStripProps {
  activeCompany: string | null;
  onSelect: (company: string | null) => void;
}

function CompanyStrip({ activeCompany, onSelect }: CompanyStripProps) {
  return (
    <div className="mb-5">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">
        All Companies
      </p>
      <div className="flex flex-wrap gap-1.5">
        <button
          type="button"
          onClick={() => onSelect(null)}
          className={`text-[11px] font-semibold px-3 py-1.5 rounded-full border transition-all duration-200 ${
            activeCompany === null
              ? "bg-primary/15 border-primary/40 text-primary"
              : "bg-muted/20 border-border text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-primary/10"
          }`}
        >
          All ({suggestedCompanies.length})
        </button>
        {suggestedCompanies.map((company) => (
          <button
            key={company}
            type="button"
            onClick={() => onSelect(activeCompany === company ? null : company)}
            className={`text-[11px] font-semibold px-3 py-1.5 rounded-full border transition-all duration-200 ${
              activeCompany === company
                ? "bg-primary/15 border-primary/40 text-primary"
                : "bg-muted/20 border-border text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-primary/10"
            }`}
          >
            {company}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Jobs Page ────────────────────────────────────────────────────────────────

interface JobsPageProps {
  onBack?: () => void;
  embedded?: boolean;
}

export function JobsPage({ onBack, embedded = false }: JobsPageProps) {
  const [activeAudience, setActiveAudience] = useState<Audience>("All");
  const [activeCompany, setActiveCompany] = useState<string | null>(null);

  const filtered = JOBS.filter((j) => {
    const matchAudience =
      activeAudience === "All" || j.audience === activeAudience;
    const matchCompany = activeCompany === null || j.company === activeCompany;
    return matchAudience && matchCompany;
  });

  const counts: Record<Audience, number> = {
    All: JOBS.length,
    "Working Professional": JOBS.filter(
      (j) => j.audience === "Working Professional",
    ).length,
    Student: JOBS.filter((j) => j.audience === "Student").length,
  };

  const content = (
    <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6">
      {/* Page intro row */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-5"
      >
        <div className="flex items-center gap-2 mb-3">
          <Briefcase size={14} className="text-primary" />
          <h2 className="font-display font-bold text-lg text-foreground">
            Top Company Job Openings
          </h2>
          <span className="text-xs text-muted-foreground">
            — {JOBS.length} curated roles
          </span>
        </div>
        <FilterTabs
          active={activeAudience}
          onChange={setActiveAudience}
          counts={counts}
        />
      </motion.div>

      {/* Company strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.08 }}
      >
        <CompanyStrip
          activeCompany={activeCompany}
          onSelect={setActiveCompany}
        />
      </motion.div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeAudience}-${activeCompany ?? "all"}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 rounded-xl border border-border bg-card/50">
              <Building2 size={24} className="text-muted-foreground mb-3" />
              <p className="font-display font-semibold text-foreground mb-1">
                No roles found
              </p>
              <p className="text-sm text-muted-foreground">
                Try a different filter or company.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((job, i) => (
                <JobCard key={job.id} job={job} index={i} />
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </main>
  );

  if (embedded) {
    return <div className="flex flex-col flex-1">{content}</div>;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Standalone header (only when not embedded) */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-4">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-border/60 text-muted-foreground hover:text-foreground hover:border-border transition-colors"
              aria-label="Back to feed"
            >
              <ArrowLeft size={15} />
            </button>
          )}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center">
              <Briefcase size={13} className="text-primary" />
            </div>
            <div>
              <h1 className="font-display font-bold text-sm text-foreground leading-none">
                Top Company Job Openings
              </h1>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                {JOBS.length} curated roles across global leaders
              </p>
            </div>
          </div>
        </div>
      </header>

      {content}

      {/* Footer */}
      <footer className="border-t border-border/50 py-4 px-6 text-center">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()}.{" "}
          <a
            href="https://Dreamcrafter.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            Built with love using Dreamcrafter
          </a>
        </p>
      </footer>
    </div>
  );
}
