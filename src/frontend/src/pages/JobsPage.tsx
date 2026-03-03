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
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { AnalyzingScreen } from "../components/AnalyzingScreen";

// ─── Data ─────────────────────────────────────────────────────────────────────

export const suggestedCompanies = [
  "Tata Consultancy Services",
  "Infosys",
  "Wipro",
  "HCL Technologies",
  "Tech Mahindra",
  "Reliance Industries",
  "HDFC Bank",
  "ICICI Bank",
  "Flipkart",
  "Zomato",
  "Swiggy",
  "Paytm",
  "BYJU'S",
  "Ola",
  "Razorpay",
  "PhonePe",
  "Zerodha",
  "Freshworks",
  "Meesho",
  "Dream11",
  "Nykaa",
  "MakeMyTrip",
  "InMobi",
  "PolicyBazaar",
  "Groww",
  // Additional companies
  "Ather Energy",
  "CRED",
  "Dunzo",
  "Lenskart",
  "Sharechat",
  "Unacademy",
  "Urban Company",
  "Vedantu",
  "Muthoot Finance",
  "Indigo Airlines",
];

/** Official career page URLs for each company */
export const careerLinks: Record<string, string> = {
  "Tata Consultancy Services": "https://www.tcs.com/careers",
  Infosys: "https://www.infosys.com/careers/",
  Wipro: "https://careers.wipro.com/",
  "HCL Technologies": "https://www.hcltech.com/careers",
  "Tech Mahindra": "https://careers.techmahindra.com/",
  "Reliance Industries": "https://www.ril.com/careers.aspx",
  "HDFC Bank":
    "https://www.hdfcbank.com/content/bbp/repositories/723fb80a-2dde-42a3-9793-7ae1be57c87f/?folderPath=/Common/Career/",
  "ICICI Bank": "https://www.icicicareers.com/",
  Flipkart: "https://www.flipkartcareers.com/",
  Zomato: "https://www.zomato.com/jobs",
  Swiggy: "https://careers.swiggy.com/",
  Paytm: "https://paytm.com/careers/",
  "BYJU'S": "https://byjus.com/careers/",
  Ola: "https://www.olacabs.com/careers",
  Razorpay: "https://razorpay.com/jobs/",
  PhonePe: "https://www.phonepe.com/en/careers.html",
  Zerodha: "https://zerodha.com/careers/",
  Freshworks: "https://www.freshworks.com/company/careers/",
  Meesho: "https://meesho.io/careers/",
  Dream11: "https://careers.dream11.com/",
  Nykaa: "https://careers.nykaa.com/",
  MakeMyTrip: "https://careers.makemytrip.com/",
  InMobi: "https://www.inmobi.com/company/careers/",
  PolicyBazaar: "https://careers.policybazaar.com/",
  Groww: "https://groww.in/p/careers",
  "Ather Energy": "https://atherenergy.com/careers",
  CRED: "https://careers.cred.club/",
  Dunzo: "https://www.dunzo.com/careers",
  Lenskart: "https://www.lenskart.com/careers.html",
  Sharechat: "https://sharechat.com/careers",
  Unacademy: "https://unacademy.com/jobs",
  "Urban Company": "https://www.urbancompany.com/careers",
  Vedantu: "https://www.vedantu.com/careers",
  "Muthoot Finance": "https://www.muthootfinance.com/career",
  "Indigo Airlines": "https://careers.goindigo.in/",
};

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
  "Tata Consultancy Services": [
    {
      id: 1,
      title: "Senior Software Engineer",
      location: "Mumbai, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
    {
      id: 2,
      title: "Software Engineering Trainee",
      location: "Chennai, Tamil Nadu",
      jobType: "Internship",
      audience: "Student",
      sector: "Technology",
    },
  ],
  Infosys: [
    {
      id: 3,
      title: "Technology Lead",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
    {
      id: 4,
      title: "Systems Engineer Intern",
      location: "Pune, Maharashtra",
      jobType: "Internship",
      audience: "Student",
      sector: "Technology",
    },
  ],
  Wipro: [
    {
      id: 5,
      title: "Project Manager",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
    {
      id: 6,
      title: "Graduate Engineer Trainee",
      location: "Hyderabad, Telangana",
      jobType: "Internship",
      audience: "Student",
      sector: "Technology",
    },
  ],
  "HCL Technologies": [
    {
      id: 7,
      title: "Cloud Solutions Architect",
      location: "Noida, Uttar Pradesh",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
    {
      id: 8,
      title: "Technology Intern",
      location: "Chennai, Tamil Nadu",
      jobType: "Internship",
      audience: "Student",
      sector: "Technology",
    },
  ],
  "Tech Mahindra": [
    {
      id: 9,
      title: "Delivery Manager",
      location: "Pune, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
    {
      id: 10,
      title: "IT Support Intern",
      location: "Bengaluru, Karnataka",
      jobType: "Internship",
      audience: "Student",
      sector: "Technology",
    },
  ],
  "Reliance Industries": [
    {
      id: 11,
      title: "Operations Manager",
      location: "Mumbai, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Conglomerate",
    },
    {
      id: 12,
      title: "Management Trainee",
      location: "Jamnagar, Gujarat",
      jobType: "Internship",
      audience: "Student",
      sector: "Conglomerate",
    },
  ],
  "HDFC Bank": [
    {
      id: 13,
      title: "Branch Manager",
      location: "Mumbai, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Finance",
    },
    {
      id: 14,
      title: "Banking Operations Intern",
      location: "Delhi, NCR",
      jobType: "Internship",
      audience: "Student",
      sector: "Finance",
    },
  ],
  "ICICI Bank": [
    {
      id: 15,
      title: "Relationship Manager",
      location: "Mumbai, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Finance",
    },
    {
      id: 16,
      title: "Finance Analyst Intern",
      location: "Bengaluru, Karnataka",
      jobType: "Internship",
      audience: "Student",
      sector: "Finance",
    },
  ],
  Flipkart: [
    {
      id: 17,
      title: "Senior Product Manager",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "E-Commerce",
    },
    {
      id: 18,
      title: "Product Management Intern",
      location: "Bengaluru, Karnataka",
      jobType: "Internship",
      audience: "Student",
      sector: "E-Commerce",
    },
  ],
  Zomato: [
    {
      id: 19,
      title: "Growth Marketing Manager",
      location: "Gurugram, Haryana",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Food & Delivery",
    },
    {
      id: 20,
      title: "Business Development Intern",
      location: "Delhi, NCR",
      jobType: "Internship",
      audience: "Student",
      sector: "Food & Delivery",
    },
  ],
  Swiggy: [
    {
      id: 21,
      title: "Data Scientist",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Food & Delivery",
    },
    {
      id: 22,
      title: "Data Analytics Intern",
      location: "Bengaluru, Karnataka",
      jobType: "Internship",
      audience: "Student",
      sector: "Food & Delivery",
    },
  ],
  Paytm: [
    {
      id: 23,
      title: "Backend Engineer",
      location: "Noida, Uttar Pradesh",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Fintech",
    },
    {
      id: 24,
      title: "Software Engineering Intern",
      location: "Noida, Uttar Pradesh",
      jobType: "Internship",
      audience: "Student",
      sector: "Fintech",
    },
  ],
  "BYJU'S": [
    {
      id: 25,
      title: "Curriculum Designer",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "EdTech",
    },
    {
      id: 26,
      title: "Content Development Intern",
      location: "Remote",
      jobType: "Internship",
      audience: "Student",
      sector: "EdTech",
    },
  ],
  Ola: [
    {
      id: 27,
      title: "Product Manager",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Transportation",
    },
    {
      id: 28,
      title: "Operations Intern",
      location: "Bengaluru, Karnataka",
      jobType: "Internship",
      audience: "Student",
      sector: "Transportation",
    },
  ],
  Razorpay: [
    {
      id: 29,
      title: "Full Stack Engineer",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Fintech",
    },
    {
      id: 30,
      title: "Engineering Intern",
      location: "Bengaluru, Karnataka",
      jobType: "Internship",
      audience: "Student",
      sector: "Fintech",
    },
  ],
  PhonePe: [
    {
      id: 31,
      title: "Android Engineer",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Fintech",
    },
    {
      id: 32,
      title: "Mobile Development Intern",
      location: "Bengaluru, Karnataka",
      jobType: "Internship",
      audience: "Student",
      sector: "Fintech",
    },
  ],
  Zerodha: [
    {
      id: 33,
      title: "Risk Analyst",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Finance",
    },
    {
      id: 34,
      title: "Finance Research Intern",
      location: "Bengaluru, Karnataka",
      jobType: "Internship",
      audience: "Student",
      sector: "Finance",
    },
  ],
  Freshworks: [
    {
      id: 35,
      title: "Solutions Engineer",
      location: "Chennai, Tamil Nadu",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
    {
      id: 36,
      title: "Software Engineering Intern",
      location: "Chennai, Tamil Nadu",
      jobType: "Internship",
      audience: "Student",
      sector: "Technology",
    },
  ],
  Meesho: [
    {
      id: 37,
      title: "Category Manager",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "E-Commerce",
    },
    {
      id: 38,
      title: "Supply Chain Intern",
      location: "Bengaluru, Karnataka",
      jobType: "Internship",
      audience: "Student",
      sector: "E-Commerce",
    },
  ],
  Dream11: [
    {
      id: 39,
      title: "Machine Learning Engineer",
      location: "Mumbai, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Gaming",
    },
    {
      id: 40,
      title: "Data Science Intern",
      location: "Mumbai, Maharashtra",
      jobType: "Internship",
      audience: "Student",
      sector: "Gaming",
    },
  ],
  Nykaa: [
    {
      id: 41,
      title: "Brand Manager",
      location: "Mumbai, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Retail",
    },
    {
      id: 42,
      title: "Digital Marketing Intern",
      location: "Mumbai, Maharashtra",
      jobType: "Internship",
      audience: "Student",
      sector: "Retail",
    },
  ],
  MakeMyTrip: [
    {
      id: 43,
      title: "Travel Product Manager",
      location: "Gurugram, Haryana",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Travel",
    },
    {
      id: 44,
      title: "Travel Tech Intern",
      location: "Delhi, NCR",
      jobType: "Internship",
      audience: "Student",
      sector: "Travel",
    },
  ],
  InMobi: [
    {
      id: 45,
      title: "Ad Tech Engineer",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
    {
      id: 46,
      title: "Software Engineering Intern",
      location: "Bengaluru, Karnataka",
      jobType: "Internship",
      audience: "Student",
      sector: "Technology",
    },
  ],
  PolicyBazaar: [
    {
      id: 47,
      title: "Insurance Advisor",
      location: "Gurugram, Haryana",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Finance",
    },
    {
      id: 48,
      title: "InsurTech Intern",
      location: "Delhi, NCR",
      jobType: "Internship",
      audience: "Student",
      sector: "Finance",
    },
  ],
  Groww: [
    {
      id: 49,
      title: "Investment Product Manager",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Fintech",
    },
    {
      id: 50,
      title: "Fintech Intern",
      location: "Bengaluru, Karnataka",
      jobType: "Internship",
      audience: "Student",
      sector: "Fintech",
    },
  ],
  "Ather Energy": [
    {
      id: 51,
      title: "EV Systems Engineer",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Automotive",
    },
    {
      id: 52,
      title: "Hardware Engineering Intern",
      location: "Bengaluru, Karnataka",
      jobType: "Internship",
      audience: "Student",
      sector: "Automotive",
    },
  ],
  CRED: [
    {
      id: 53,
      title: "Senior Backend Engineer",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Fintech",
    },
    {
      id: 54,
      title: "Product Design Intern",
      location: "Bengaluru, Karnataka",
      jobType: "Internship",
      audience: "Student",
      sector: "Fintech",
    },
  ],
  Dunzo: [
    {
      id: 55,
      title: "City Operations Manager",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Food & Delivery",
    },
    {
      id: 56,
      title: "Operations Intern",
      location: "Delhi, NCR",
      jobType: "Internship",
      audience: "Student",
      sector: "Food & Delivery",
    },
  ],
  Lenskart: [
    {
      id: 57,
      title: "Retail Expansion Manager",
      location: "Delhi, NCR",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Retail",
    },
    {
      id: 58,
      title: "Digital Marketing Intern",
      location: "Gurugram, Haryana",
      jobType: "Internship",
      audience: "Student",
      sector: "Retail",
    },
  ],
  Sharechat: [
    {
      id: 59,
      title: "ML Research Engineer",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Social Media",
    },
    {
      id: 60,
      title: "Content Strategy Intern",
      location: "Bengaluru, Karnataka",
      jobType: "Internship",
      audience: "Student",
      sector: "Social Media",
    },
  ],
  Unacademy: [
    {
      id: 61,
      title: "Educator Success Manager",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "EdTech",
    },
    {
      id: 62,
      title: "Content Development Intern",
      location: "Remote",
      jobType: "Internship",
      audience: "Student",
      sector: "EdTech",
    },
  ],
  "Urban Company": [
    {
      id: 63,
      title: "Partner Growth Manager",
      location: "Gurugram, Haryana",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Consulting",
    },
    {
      id: 64,
      title: "Business Development Intern",
      location: "Mumbai, Maharashtra",
      jobType: "Internship",
      audience: "Student",
      sector: "Consulting",
    },
  ],
  Vedantu: [
    {
      id: 65,
      title: "Live Teaching Specialist",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "EdTech",
    },
    {
      id: 66,
      title: "Teaching Intern",
      location: "Remote",
      jobType: "Internship",
      audience: "Student",
      sector: "EdTech",
    },
  ],
  "Muthoot Finance": [
    {
      id: 67,
      title: "Branch Credit Manager",
      location: "Kochi, Kerala",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Finance",
    },
    {
      id: 68,
      title: "Finance Trainee",
      location: "Chennai, Tamil Nadu",
      jobType: "Internship",
      audience: "Student",
      sector: "Finance",
    },
  ],
  "Indigo Airlines": [
    {
      id: 69,
      title: "Aviation Operations Manager",
      location: "Delhi, NCR",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Travel",
    },
    {
      id: 70,
      title: "Ground Operations Intern",
      location: "Mumbai, Maharashtra",
      jobType: "Internship",
      audience: "Student",
      sector: "Travel",
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
    Fintech: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    Healthcare: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    "E-Commerce": "bg-amber-500/10 text-amber-400 border-amber-500/20",
    Automotive: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    Consulting: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    Entertainment: "bg-pink-500/10 text-pink-400 border-pink-500/20",
    "Social Media": "bg-sky-500/10 text-sky-400 border-sky-500/20",
    Travel: "bg-teal-500/10 text-teal-400 border-teal-500/20",
    EdTech: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    "Food & Delivery": "bg-orange-500/10 text-orange-400 border-orange-500/20",
    Transportation: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    Conglomerate: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    Gaming: "bg-pink-500/10 text-pink-400 border-pink-500/20",
    Retail: "bg-rose-500/10 text-rose-400 border-rose-500/20",
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
    const url = careerLinks[job.company];
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      toast.success(`Application started for ${job.title} at ${job.company}!`, {
        description: "You will be redirected to the company careers page.",
      });
    }
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
  const [analyzingCompany, setAnalyzingCompany] = useState<string | null>(null);

  const handleCompanySelect = useCallback(
    (company: string | null) => {
      if (company && company !== activeCompany) {
        setAnalyzingCompany(company);
      } else {
        setActiveCompany(company);
      }
    },
    [activeCompany],
  );

  const handleAnalyzeComplete = useCallback(() => {
    if (analyzingCompany) {
      setActiveCompany(analyzingCompany);
      setAnalyzingCompany(null);
    }
  }, [analyzingCompany]);

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
            Top Indian Company Job Openings
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
          onSelect={handleCompanySelect}
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
    return (
      <>
        <div className="flex flex-col flex-1">{content}</div>
        {analyzingCompany && (
          <AnalyzingScreen
            company={analyzingCompany}
            onComplete={handleAnalyzeComplete}
          />
        )}
      </>
    );
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
                Top Indian Company Job Openings
              </h1>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                {JOBS.length} curated roles across top Indian companies
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

      {analyzingCompany && (
        <AnalyzingScreen
          company={analyzingCompany}
          onComplete={handleAnalyzeComplete}
        />
      )}
    </div>
  );
}
