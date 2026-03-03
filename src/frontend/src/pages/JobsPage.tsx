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
  // New companies to reach 50+
  "Bajaj Finserv",
  "Airtel",
  "Jio Platforms",
  "Mahindra & Mahindra",
  "Tata Motors",
  "Hindustan Unilever",
  "ITC Limited",
  "Larsen & Toubro",
  "Axis Bank",
  "Kotak Mahindra Bank",
  "Amazon India",
  "Microsoft India",
  "IBM India",
  "Accenture India",
  "Deloitte India",
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
  "Bajaj Finserv": "https://www.bajajfinserv.in/careers",
  Airtel: "https://www.airtel.in/careers/",
  "Jio Platforms": "https://www.jio.com/en-in/careers/",
  "Mahindra & Mahindra": "https://www.mahindra.com/careers",
  "Tata Motors": "https://www.tatamotors.com/careers/",
  "Hindustan Unilever": "https://www.hul.co.in/careers/",
  "ITC Limited": "https://www.itcportal.com/human-capital/careers.aspx",
  "Larsen & Toubro": "https://www.larsentoubro.com/careers/",
  "Axis Bank": "https://www.axisbank.com/careers",
  "Kotak Mahindra Bank": "https://www.kotak.com/en/careers.html",
  "Amazon India": "https://www.amazon.jobs/en/locations/india",
  "Microsoft India": "https://careers.microsoft.com/",
  "IBM India": "https://www.ibm.com/in-en/employment/",
  "Accenture India": "https://www.accenture.com/in-en/careers",
  "Deloitte India": "https://www2.deloitte.com/in/en/careers.html",
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
    {
      id: 3,
      title: "Business Analyst",
      location: "Pune, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
    {
      id: 4,
      title: "DevOps Engineer",
      location: "Hyderabad, Telangana",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
    {
      id: 5,
      title: "Data Science Intern",
      location: "Bengaluru, Karnataka",
      jobType: "Internship",
      audience: "Student",
      sector: "Technology",
    },
    {
      id: 6,
      title: "Cloud Engineer",
      location: "Noida, Uttar Pradesh",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
  ],
  Infosys: [
    {
      id: 7,
      title: "Technology Lead",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
    {
      id: 8,
      title: "Systems Engineer Intern",
      location: "Pune, Maharashtra",
      jobType: "Internship",
      audience: "Student",
      sector: "Technology",
    },
    {
      id: 9,
      title: "Senior Consultant",
      location: "Hyderabad, Telangana",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
    {
      id: 10,
      title: "Digital Marketing Intern",
      location: "Chennai, Tamil Nadu",
      jobType: "Internship",
      audience: "Student",
      sector: "Technology",
    },
    {
      id: 11,
      title: "UX Designer",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
    {
      id: 12,
      title: "QA Automation Engineer",
      location: "Mysuru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
  ],
  Wipro: [
    {
      id: 13,
      title: "Project Manager",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
    {
      id: 14,
      title: "Graduate Engineer Trainee",
      location: "Hyderabad, Telangana",
      jobType: "Internship",
      audience: "Student",
      sector: "Technology",
    },
    {
      id: 15,
      title: "Cybersecurity Analyst",
      location: "Pune, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
    {
      id: 16,
      title: "Software Testing Intern",
      location: "Chennai, Tamil Nadu",
      jobType: "Internship",
      audience: "Student",
      sector: "Technology",
    },
    {
      id: 17,
      title: "Solution Architect",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
    {
      id: 18,
      title: "AI/ML Engineer",
      location: "Mumbai, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
  ],
  "HCL Technologies": [
    {
      id: 19,
      title: "Cloud Solutions Architect",
      location: "Noida, Uttar Pradesh",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
    {
      id: 20,
      title: "Technology Intern",
      location: "Chennai, Tamil Nadu",
      jobType: "Internship",
      audience: "Student",
      sector: "Technology",
    },
    {
      id: 21,
      title: "SAP Consultant",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
    {
      id: 22,
      title: "Full Stack Developer",
      location: "Hyderabad, Telangana",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
    {
      id: 23,
      title: "Data Engineering Intern",
      location: "Pune, Maharashtra",
      jobType: "Internship",
      audience: "Student",
      sector: "Technology",
    },
    {
      id: 24,
      title: "Network Engineer",
      location: "Delhi, NCR",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
  ],
  "Tech Mahindra": [
    {
      id: 25,
      title: "Delivery Manager",
      location: "Pune, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
    {
      id: 26,
      title: "IT Support Intern",
      location: "Bengaluru, Karnataka",
      jobType: "Internship",
      audience: "Student",
      sector: "Technology",
    },
    {
      id: 27,
      title: "Telecom Software Engineer",
      location: "Hyderabad, Telangana",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
    {
      id: 28,
      title: "Product Owner",
      location: "Mumbai, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
    {
      id: 29,
      title: "Business Analytics Intern",
      location: "Pune, Maharashtra",
      jobType: "Internship",
      audience: "Student",
      sector: "Technology",
    },
    {
      id: 30,
      title: "RPA Developer",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
  ],
  "Reliance Industries": [
    {
      id: 31,
      title: "Operations Manager",
      location: "Mumbai, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Conglomerate",
    },
    {
      id: 32,
      title: "Management Trainee",
      location: "Jamnagar, Gujarat",
      jobType: "Internship",
      audience: "Student",
      sector: "Conglomerate",
    },
    {
      id: 33,
      title: "Chemical Process Engineer",
      location: "Jamnagar, Gujarat",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Conglomerate",
    },
    {
      id: 34,
      title: "HR Business Partner",
      location: "Mumbai, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Conglomerate",
    },
    {
      id: 35,
      title: "Supply Chain Intern",
      location: "Navi Mumbai, Maharashtra",
      jobType: "Internship",
      audience: "Student",
      sector: "Conglomerate",
    },
    {
      id: 36,
      title: "Finance Analyst",
      location: "Mumbai, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Conglomerate",
    },
  ],
  "HDFC Bank": [
    {
      id: 37,
      title: "Branch Manager",
      location: "Mumbai, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Finance",
    },
    {
      id: 38,
      title: "Banking Operations Intern",
      location: "Delhi, NCR",
      jobType: "Internship",
      audience: "Student",
      sector: "Finance",
    },
    {
      id: 39,
      title: "Credit Risk Analyst",
      location: "Mumbai, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Finance",
    },
    {
      id: 40,
      title: "Digital Banking Specialist",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Finance",
    },
    {
      id: 41,
      title: "Wealth Management Intern",
      location: "Mumbai, Maharashtra",
      jobType: "Internship",
      audience: "Student",
      sector: "Finance",
    },
    {
      id: 42,
      title: "Compliance Officer",
      location: "Gurugram, Haryana",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Finance",
    },
  ],
  "ICICI Bank": [
    {
      id: 43,
      title: "Relationship Manager",
      location: "Mumbai, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Finance",
    },
    {
      id: 44,
      title: "Finance Analyst Intern",
      location: "Bengaluru, Karnataka",
      jobType: "Internship",
      audience: "Student",
      sector: "Finance",
    },
    {
      id: 45,
      title: "IT Security Analyst",
      location: "Hyderabad, Telangana",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Finance",
    },
    {
      id: 46,
      title: "Retail Banking Associate",
      location: "Delhi, NCR",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Finance",
    },
    {
      id: 47,
      title: "Data Analytics Intern",
      location: "Mumbai, Maharashtra",
      jobType: "Internship",
      audience: "Student",
      sector: "Finance",
    },
    {
      id: 48,
      title: "Treasury Analyst",
      location: "Mumbai, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Finance",
    },
  ],
  Flipkart: [
    {
      id: 49,
      title: "Senior Product Manager",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "E-Commerce",
    },
    {
      id: 50,
      title: "Product Management Intern",
      location: "Bengaluru, Karnataka",
      jobType: "Internship",
      audience: "Student",
      sector: "E-Commerce",
    },
    {
      id: 51,
      title: "Backend Engineer",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "E-Commerce",
    },
    {
      id: 52,
      title: "Category Growth Manager",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "E-Commerce",
    },
    {
      id: 53,
      title: "Data Science Intern",
      location: "Bengaluru, Karnataka",
      jobType: "Internship",
      audience: "Student",
      sector: "E-Commerce",
    },
    {
      id: 54,
      title: "Logistics Operations Lead",
      location: "Mumbai, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "E-Commerce",
    },
  ],
  Zomato: [
    {
      id: 55,
      title: "Growth Marketing Manager",
      location: "Gurugram, Haryana",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Food & Delivery",
    },
    {
      id: 56,
      title: "Business Development Intern",
      location: "Delhi, NCR",
      jobType: "Internship",
      audience: "Student",
      sector: "Food & Delivery",
    },
    {
      id: 57,
      title: "Machine Learning Engineer",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Food & Delivery",
    },
    {
      id: 58,
      title: "Restaurant Partner Manager",
      location: "Mumbai, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Food & Delivery",
    },
    {
      id: 59,
      title: "Marketing Analytics Intern",
      location: "Gurugram, Haryana",
      jobType: "Internship",
      audience: "Student",
      sector: "Food & Delivery",
    },
    {
      id: 60,
      title: "UX Researcher",
      location: "Gurugram, Haryana",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Food & Delivery",
    },
  ],
  Swiggy: [
    {
      id: 61,
      title: "Data Scientist",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Food & Delivery",
    },
    {
      id: 62,
      title: "Data Analytics Intern",
      location: "Bengaluru, Karnataka",
      jobType: "Internship",
      audience: "Student",
      sector: "Food & Delivery",
    },
    {
      id: 63,
      title: "Product Manager - Hyperlocal",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Food & Delivery",
    },
    {
      id: 64,
      title: "Supply Chain Analyst",
      location: "Mumbai, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Food & Delivery",
    },
    {
      id: 65,
      title: "Operations Research Intern",
      location: "Bengaluru, Karnataka",
      jobType: "Internship",
      audience: "Student",
      sector: "Food & Delivery",
    },
    {
      id: 66,
      title: "City Head",
      location: "Delhi, NCR",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Food & Delivery",
    },
  ],
  Paytm: [
    {
      id: 67,
      title: "Backend Engineer",
      location: "Noida, Uttar Pradesh",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Fintech",
    },
    {
      id: 68,
      title: "Software Engineering Intern",
      location: "Noida, Uttar Pradesh",
      jobType: "Internship",
      audience: "Student",
      sector: "Fintech",
    },
    {
      id: 69,
      title: "Payments Product Manager",
      location: "Noida, Uttar Pradesh",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Fintech",
    },
    {
      id: 70,
      title: "Android Developer",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Fintech",
    },
    {
      id: 71,
      title: "FinTech Research Intern",
      location: "Noida, Uttar Pradesh",
      jobType: "Internship",
      audience: "Student",
      sector: "Fintech",
    },
    {
      id: 72,
      title: "Risk & Fraud Analyst",
      location: "Noida, Uttar Pradesh",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Fintech",
    },
  ],
  "BYJU'S": [
    {
      id: 73,
      title: "Curriculum Designer",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "EdTech",
    },
    {
      id: 74,
      title: "Content Development Intern",
      location: "Remote",
      jobType: "Internship",
      audience: "Student",
      sector: "EdTech",
    },
    {
      id: 75,
      title: "Sales Executive",
      location: "Mumbai, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "EdTech",
    },
    {
      id: 76,
      title: "Instructional Designer",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "EdTech",
    },
    {
      id: 77,
      title: "EdTech Research Intern",
      location: "Remote",
      jobType: "Internship",
      audience: "Student",
      sector: "EdTech",
    },
    {
      id: 78,
      title: "Marketing Manager",
      location: "Delhi, NCR",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "EdTech",
    },
  ],
  Ola: [
    {
      id: 79,
      title: "Product Manager",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Transportation",
    },
    {
      id: 80,
      title: "Operations Intern",
      location: "Bengaluru, Karnataka",
      jobType: "Internship",
      audience: "Student",
      sector: "Transportation",
    },
    {
      id: 81,
      title: "EV Software Engineer",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Transportation",
    },
    {
      id: 82,
      title: "Driver Partner Relations Manager",
      location: "Hyderabad, Telangana",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Transportation",
    },
    {
      id: 83,
      title: "Data Engineering Intern",
      location: "Bengaluru, Karnataka",
      jobType: "Internship",
      audience: "Student",
      sector: "Transportation",
    },
    {
      id: 84,
      title: "Growth Hacker",
      location: "Mumbai, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Transportation",
    },
  ],
  Razorpay: [
    {
      id: 85,
      title: "Full Stack Engineer",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Fintech",
    },
    {
      id: 86,
      title: "Engineering Intern",
      location: "Bengaluru, Karnataka",
      jobType: "Internship",
      audience: "Student",
      sector: "Fintech",
    },
    {
      id: 87,
      title: "Payments API Developer",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Fintech",
    },
    {
      id: 88,
      title: "Product Analyst",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Fintech",
    },
    {
      id: 89,
      title: "Product Design Intern",
      location: "Bengaluru, Karnataka",
      jobType: "Internship",
      audience: "Student",
      sector: "Fintech",
    },
    {
      id: 90,
      title: "Enterprise Sales Manager",
      location: "Mumbai, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Fintech",
    },
  ],
  PhonePe: [
    {
      id: 91,
      title: "Android Engineer",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Fintech",
    },
    {
      id: 92,
      title: "Mobile Development Intern",
      location: "Bengaluru, Karnataka",
      jobType: "Internship",
      audience: "Student",
      sector: "Fintech",
    },
    {
      id: 93,
      title: "Platform Reliability Engineer",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Fintech",
    },
    {
      id: 94,
      title: "Merchant Acquisition Manager",
      location: "Delhi, NCR",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Fintech",
    },
    {
      id: 95,
      title: "Finance & Accounting Intern",
      location: "Bengaluru, Karnataka",
      jobType: "Internship",
      audience: "Student",
      sector: "Fintech",
    },
    {
      id: 96,
      title: "Security Engineer",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Fintech",
    },
  ],
  Zerodha: [
    {
      id: 97,
      title: "Risk Analyst",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Finance",
    },
    {
      id: 98,
      title: "Finance Research Intern",
      location: "Bengaluru, Karnataka",
      jobType: "Internship",
      audience: "Student",
      sector: "Finance",
    },
    {
      id: 99,
      title: "Frontend Engineer",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Finance",
    },
    {
      id: 100,
      title: "Trading Platform Developer",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Finance",
    },
    {
      id: 101,
      title: "Customer Support Intern",
      location: "Bengaluru, Karnataka",
      jobType: "Internship",
      audience: "Student",
      sector: "Finance",
    },
    {
      id: 102,
      title: "Compliance & Regulatory Analyst",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Finance",
    },
  ],
  Freshworks: [
    {
      id: 103,
      title: "Solutions Engineer",
      location: "Chennai, Tamil Nadu",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
    {
      id: 104,
      title: "Software Engineering Intern",
      location: "Chennai, Tamil Nadu",
      jobType: "Internship",
      audience: "Student",
      sector: "Technology",
    },
    {
      id: 105,
      title: "Customer Success Manager",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
    {
      id: 106,
      title: "Product Designer",
      location: "Chennai, Tamil Nadu",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
    {
      id: 107,
      title: "SaaS Marketing Intern",
      location: "Remote",
      jobType: "Internship",
      audience: "Student",
      sector: "Technology",
    },
    {
      id: 108,
      title: "Enterprise Account Executive",
      location: "Mumbai, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
  ],
  Meesho: [
    {
      id: 109,
      title: "Category Manager",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "E-Commerce",
    },
    {
      id: 110,
      title: "Supply Chain Intern",
      location: "Bengaluru, Karnataka",
      jobType: "Internship",
      audience: "Student",
      sector: "E-Commerce",
    },
    {
      id: 111,
      title: "Data Engineer",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "E-Commerce",
    },
    {
      id: 112,
      title: "Social Commerce Manager",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "E-Commerce",
    },
    {
      id: 113,
      title: "Product Research Intern",
      location: "Remote",
      jobType: "Internship",
      audience: "Student",
      sector: "E-Commerce",
    },
    {
      id: 114,
      title: "Seller Growth Associate",
      location: "Delhi, NCR",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "E-Commerce",
    },
  ],
  Dream11: [
    {
      id: 115,
      title: "Machine Learning Engineer",
      location: "Mumbai, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Gaming",
    },
    {
      id: 116,
      title: "Data Science Intern",
      location: "Mumbai, Maharashtra",
      jobType: "Internship",
      audience: "Student",
      sector: "Gaming",
    },
    {
      id: 117,
      title: "Game Designer",
      location: "Mumbai, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Gaming",
    },
    {
      id: 118,
      title: "Backend Platform Engineer",
      location: "Mumbai, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Gaming",
    },
    {
      id: 119,
      title: "Sports Analytics Intern",
      location: "Mumbai, Maharashtra",
      jobType: "Internship",
      audience: "Student",
      sector: "Gaming",
    },
    {
      id: 120,
      title: "Growth Marketing Manager",
      location: "Pune, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Gaming",
    },
  ],
  Nykaa: [
    {
      id: 121,
      title: "Brand Manager",
      location: "Mumbai, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Retail",
    },
    {
      id: 122,
      title: "Digital Marketing Intern",
      location: "Mumbai, Maharashtra",
      jobType: "Internship",
      audience: "Student",
      sector: "Retail",
    },
    {
      id: 123,
      title: "E-Commerce Merchandising Lead",
      location: "Mumbai, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Retail",
    },
    {
      id: 124,
      title: "Beauty Advisor",
      location: "Delhi, NCR",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Retail",
    },
    {
      id: 125,
      title: "Fashion Styling Intern",
      location: "Mumbai, Maharashtra",
      jobType: "Internship",
      audience: "Student",
      sector: "Retail",
    },
    {
      id: 126,
      title: "Logistics & Fulfillment Manager",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Retail",
    },
  ],
  MakeMyTrip: [
    {
      id: 127,
      title: "Travel Product Manager",
      location: "Gurugram, Haryana",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Travel",
    },
    {
      id: 128,
      title: "Travel Tech Intern",
      location: "Delhi, NCR",
      jobType: "Internship",
      audience: "Student",
      sector: "Travel",
    },
    {
      id: 129,
      title: "Revenue Management Analyst",
      location: "Gurugram, Haryana",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Travel",
    },
    {
      id: 130,
      title: "Hotel Partnerships Manager",
      location: "Mumbai, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Travel",
    },
    {
      id: 131,
      title: "Customer Experience Intern",
      location: "Remote",
      jobType: "Internship",
      audience: "Student",
      sector: "Travel",
    },
    {
      id: 132,
      title: "SEO & Content Strategist",
      location: "Gurugram, Haryana",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Travel",
    },
  ],
  InMobi: [
    {
      id: 133,
      title: "Ad Tech Engineer",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
    {
      id: 134,
      title: "Software Engineering Intern",
      location: "Bengaluru, Karnataka",
      jobType: "Internship",
      audience: "Student",
      sector: "Technology",
    },
    {
      id: 135,
      title: "Programmatic Advertising Manager",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
    {
      id: 136,
      title: "Data Platform Engineer",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
    {
      id: 137,
      title: "Mobile Analytics Intern",
      location: "Bengaluru, Karnataka",
      jobType: "Internship",
      audience: "Student",
      sector: "Technology",
    },
    {
      id: 138,
      title: "Publisher Solutions Manager",
      location: "Mumbai, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
  ],
  PolicyBazaar: [
    {
      id: 139,
      title: "Insurance Advisor",
      location: "Gurugram, Haryana",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Finance",
    },
    {
      id: 140,
      title: "InsurTech Intern",
      location: "Delhi, NCR",
      jobType: "Internship",
      audience: "Student",
      sector: "Finance",
    },
    {
      id: 141,
      title: "Full Stack Developer",
      location: "Gurugram, Haryana",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Finance",
    },
    {
      id: 142,
      title: "Actuarial Analyst",
      location: "Gurugram, Haryana",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Finance",
    },
    {
      id: 143,
      title: "Customer Success Intern",
      location: "Remote",
      jobType: "Internship",
      audience: "Student",
      sector: "Finance",
    },
    {
      id: 144,
      title: "Digital Growth Manager",
      location: "Gurugram, Haryana",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Finance",
    },
  ],
  Groww: [
    {
      id: 145,
      title: "Investment Product Manager",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Fintech",
    },
    {
      id: 146,
      title: "Fintech Intern",
      location: "Bengaluru, Karnataka",
      jobType: "Internship",
      audience: "Student",
      sector: "Fintech",
    },
    {
      id: 147,
      title: "iOS Developer",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Fintech",
    },
    {
      id: 148,
      title: "Mutual Funds Analyst",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Fintech",
    },
    {
      id: 149,
      title: "UX Research Intern",
      location: "Remote",
      jobType: "Internship",
      audience: "Student",
      sector: "Fintech",
    },
    {
      id: 150,
      title: "Brand Communications Lead",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Fintech",
    },
  ],
  "Ather Energy": [
    {
      id: 151,
      title: "EV Systems Engineer",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Automotive",
    },
    {
      id: 152,
      title: "Hardware Engineering Intern",
      location: "Bengaluru, Karnataka",
      jobType: "Internship",
      audience: "Student",
      sector: "Automotive",
    },
    {
      id: 153,
      title: "Battery Technology Engineer",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Automotive",
    },
    {
      id: 154,
      title: "Embedded Software Developer",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Automotive",
    },
    {
      id: 155,
      title: "Mechanical Design Intern",
      location: "Bengaluru, Karnataka",
      jobType: "Internship",
      audience: "Student",
      sector: "Automotive",
    },
    {
      id: 156,
      title: "Charging Infrastructure Manager",
      location: "Mumbai, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Automotive",
    },
  ],
  CRED: [
    {
      id: 157,
      title: "Senior Backend Engineer",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Fintech",
    },
    {
      id: 158,
      title: "Product Design Intern",
      location: "Bengaluru, Karnataka",
      jobType: "Internship",
      audience: "Student",
      sector: "Fintech",
    },
    {
      id: 159,
      title: "Credit Risk Manager",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Fintech",
    },
    {
      id: 160,
      title: "Platform Engineer",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Fintech",
    },
    {
      id: 161,
      title: "Community & Growth Intern",
      location: "Bengaluru, Karnataka",
      jobType: "Internship",
      audience: "Student",
      sector: "Fintech",
    },
    {
      id: 162,
      title: "Brand Experience Lead",
      location: "Mumbai, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Fintech",
    },
  ],
  Dunzo: [
    {
      id: 163,
      title: "City Operations Manager",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Food & Delivery",
    },
    {
      id: 164,
      title: "Operations Intern",
      location: "Delhi, NCR",
      jobType: "Internship",
      audience: "Student",
      sector: "Food & Delivery",
    },
    {
      id: 165,
      title: "Hyperlocal Product Manager",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Food & Delivery",
    },
    {
      id: 166,
      title: "Last Mile Logistics Lead",
      location: "Mumbai, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Food & Delivery",
    },
    {
      id: 167,
      title: "Business Development Intern",
      location: "Bengaluru, Karnataka",
      jobType: "Internship",
      audience: "Student",
      sector: "Food & Delivery",
    },
    {
      id: 168,
      title: "Vendor Partnership Manager",
      location: "Chennai, Tamil Nadu",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Food & Delivery",
    },
  ],
  Lenskart: [
    {
      id: 169,
      title: "Retail Expansion Manager",
      location: "Delhi, NCR",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Retail",
    },
    {
      id: 170,
      title: "Digital Marketing Intern",
      location: "Gurugram, Haryana",
      jobType: "Internship",
      audience: "Student",
      sector: "Retail",
    },
    {
      id: 171,
      title: "Optometrist & Store Manager",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Retail",
    },
    {
      id: 172,
      title: "AR/VR Product Developer",
      location: "Gurugram, Haryana",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Retail",
    },
    {
      id: 173,
      title: "Visual Merchandising Intern",
      location: "Delhi, NCR",
      jobType: "Internship",
      audience: "Student",
      sector: "Retail",
    },
    {
      id: 174,
      title: "Supply Chain & Procurement Head",
      location: "Delhi, NCR",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Retail",
    },
  ],
  Sharechat: [
    {
      id: 175,
      title: "ML Research Engineer",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Social Media",
    },
    {
      id: 176,
      title: "Content Strategy Intern",
      location: "Bengaluru, Karnataka",
      jobType: "Internship",
      audience: "Student",
      sector: "Social Media",
    },
    {
      id: 177,
      title: "Creator Partnerships Lead",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Social Media",
    },
    {
      id: 178,
      title: "Video Recommendation Engineer",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Social Media",
    },
    {
      id: 179,
      title: "Social Media Analytics Intern",
      location: "Bengaluru, Karnataka",
      jobType: "Internship",
      audience: "Student",
      sector: "Social Media",
    },
    {
      id: 180,
      title: "Trust & Safety Manager",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Social Media",
    },
  ],
  Unacademy: [
    {
      id: 181,
      title: "Educator Success Manager",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "EdTech",
    },
    {
      id: 182,
      title: "Content Development Intern",
      location: "Remote",
      jobType: "Internship",
      audience: "Student",
      sector: "EdTech",
    },
    {
      id: 183,
      title: "Video Production Lead",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "EdTech",
    },
    {
      id: 184,
      title: "Learning Experience Designer",
      location: "Remote",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "EdTech",
    },
    {
      id: 185,
      title: "Growth Marketing Intern",
      location: "Bengaluru, Karnataka",
      jobType: "Internship",
      audience: "Student",
      sector: "EdTech",
    },
    {
      id: 186,
      title: "Academic Counsellor",
      location: "Delhi, NCR",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "EdTech",
    },
  ],
  "Urban Company": [
    {
      id: 187,
      title: "Partner Growth Manager",
      location: "Gurugram, Haryana",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Consulting",
    },
    {
      id: 188,
      title: "Business Development Intern",
      location: "Mumbai, Maharashtra",
      jobType: "Internship",
      audience: "Student",
      sector: "Consulting",
    },
    {
      id: 189,
      title: "Operations Technology Lead",
      location: "Gurugram, Haryana",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Consulting",
    },
    {
      id: 190,
      title: "Quality Assurance Manager",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Consulting",
    },
    {
      id: 191,
      title: "Data Analysis Intern",
      location: "Remote",
      jobType: "Internship",
      audience: "Student",
      sector: "Consulting",
    },
    {
      id: 192,
      title: "Marketplace Product Manager",
      location: "Delhi, NCR",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Consulting",
    },
  ],
  Vedantu: [
    {
      id: 193,
      title: "Live Teaching Specialist",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "EdTech",
    },
    {
      id: 194,
      title: "Teaching Intern",
      location: "Remote",
      jobType: "Internship",
      audience: "Student",
      sector: "EdTech",
    },
    {
      id: 195,
      title: "Curriculum Product Manager",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "EdTech",
    },
    {
      id: 196,
      title: "Student Engagement Specialist",
      location: "Remote",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "EdTech",
    },
    {
      id: 197,
      title: "Academic Research Intern",
      location: "Remote",
      jobType: "Internship",
      audience: "Student",
      sector: "EdTech",
    },
    {
      id: 198,
      title: "Platform Growth Manager",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "EdTech",
    },
  ],
  "Muthoot Finance": [
    {
      id: 199,
      title: "Branch Credit Manager",
      location: "Kochi, Kerala",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Finance",
    },
    {
      id: 200,
      title: "Finance Trainee",
      location: "Chennai, Tamil Nadu",
      jobType: "Internship",
      audience: "Student",
      sector: "Finance",
    },
    {
      id: 201,
      title: "Gold Loan Officer",
      location: "Thrissur, Kerala",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Finance",
    },
    {
      id: 202,
      title: "Operations & Compliance Head",
      location: "Kochi, Kerala",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Finance",
    },
    {
      id: 203,
      title: "Banking & Finance Intern",
      location: "Chennai, Tamil Nadu",
      jobType: "Internship",
      audience: "Student",
      sector: "Finance",
    },
    {
      id: 204,
      title: "IT Infrastructure Manager",
      location: "Kochi, Kerala",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Finance",
    },
  ],
  "Indigo Airlines": [
    {
      id: 205,
      title: "Aviation Operations Manager",
      location: "Delhi, NCR",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Travel",
    },
    {
      id: 206,
      title: "Ground Operations Intern",
      location: "Mumbai, Maharashtra",
      jobType: "Internship",
      audience: "Student",
      sector: "Travel",
    },
    {
      id: 207,
      title: "Cabin Crew",
      location: "Delhi, NCR",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Travel",
    },
    {
      id: 208,
      title: "Revenue Analyst",
      location: "Gurugram, Haryana",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Travel",
    },
    {
      id: 209,
      title: "Airport Operations Intern",
      location: "Bengaluru, Karnataka",
      jobType: "Internship",
      audience: "Student",
      sector: "Travel",
    },
    {
      id: 210,
      title: "Aircraft Maintenance Engineer",
      location: "Hyderabad, Telangana",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Travel",
    },
  ],
  // New companies
  "Bajaj Finserv": [
    {
      id: 211,
      title: "Financial Services Manager",
      location: "Pune, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Finance",
    },
    {
      id: 212,
      title: "Finance & Banking Intern",
      location: "Pune, Maharashtra",
      jobType: "Internship",
      audience: "Student",
      sector: "Finance",
    },
    {
      id: 213,
      title: "Loan Product Specialist",
      location: "Mumbai, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Finance",
    },
    {
      id: 214,
      title: "Digital Lending Analyst",
      location: "Pune, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Finance",
    },
    {
      id: 215,
      title: "Credit Underwriting Intern",
      location: "Pune, Maharashtra",
      jobType: "Internship",
      audience: "Student",
      sector: "Finance",
    },
    {
      id: 216,
      title: "Insurance Sales Manager",
      location: "Delhi, NCR",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Finance",
    },
  ],
  Airtel: [
    {
      id: 217,
      title: "Telecom Network Engineer",
      location: "Delhi, NCR",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
    {
      id: 218,
      title: "Telecom Technology Intern",
      location: "Gurugram, Haryana",
      jobType: "Internship",
      audience: "Student",
      sector: "Technology",
    },
    {
      id: 219,
      title: "5G Product Manager",
      location: "Gurugram, Haryana",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
    {
      id: 220,
      title: "Digital Revenue Manager",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
    {
      id: 221,
      title: "Network Analytics Intern",
      location: "Noida, Uttar Pradesh",
      jobType: "Internship",
      audience: "Student",
      sector: "Technology",
    },
    {
      id: 222,
      title: "Enterprise Sales Director",
      location: "Mumbai, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
  ],
  "Jio Platforms": [
    {
      id: 223,
      title: "Platform Software Engineer",
      location: "Mumbai, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
    {
      id: 224,
      title: "Tech Innovation Intern",
      location: "Navi Mumbai, Maharashtra",
      jobType: "Internship",
      audience: "Student",
      sector: "Technology",
    },
    {
      id: 225,
      title: "AI/ML Research Scientist",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
    {
      id: 226,
      title: "Cloud Infrastructure Architect",
      location: "Mumbai, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
    {
      id: 227,
      title: "Product Strategy Intern",
      location: "Mumbai, Maharashtra",
      jobType: "Internship",
      audience: "Student",
      sector: "Technology",
    },
    {
      id: 228,
      title: "Streaming Media Engineer",
      location: "Navi Mumbai, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
  ],
  "Mahindra & Mahindra": [
    {
      id: 229,
      title: "Automotive Design Engineer",
      location: "Mumbai, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Automotive",
    },
    {
      id: 230,
      title: "Manufacturing Engineering Intern",
      location: "Pune, Maharashtra",
      jobType: "Internship",
      audience: "Student",
      sector: "Automotive",
    },
    {
      id: 231,
      title: "EV Powertrain Engineer",
      location: "Pune, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Automotive",
    },
    {
      id: 232,
      title: "Supply Chain Manager",
      location: "Mumbai, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Automotive",
    },
    {
      id: 233,
      title: "Product Lifecycle Intern",
      location: "Nashik, Maharashtra",
      jobType: "Internship",
      audience: "Student",
      sector: "Automotive",
    },
    {
      id: 234,
      title: "Connected Vehicle Software Lead",
      location: "Pune, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Automotive",
    },
  ],
  "Tata Motors": [
    {
      id: 235,
      title: "Senior Vehicle Dynamics Engineer",
      location: "Pune, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Automotive",
    },
    {
      id: 236,
      title: "Automobile Engineering Intern",
      location: "Jamshedpur, Jharkhand",
      jobType: "Internship",
      audience: "Student",
      sector: "Automotive",
    },
    {
      id: 237,
      title: "EV Battery R&D Lead",
      location: "Pune, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Automotive",
    },
    {
      id: 238,
      title: "Digital Marketing Manager",
      location: "Mumbai, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Automotive",
    },
    {
      id: 239,
      title: "Smart Manufacturing Intern",
      location: "Pune, Maharashtra",
      jobType: "Internship",
      audience: "Student",
      sector: "Automotive",
    },
    {
      id: 240,
      title: "International Sales Manager",
      location: "Mumbai, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Automotive",
    },
  ],
  "Hindustan Unilever": [
    {
      id: 241,
      title: "Brand Manager - FMCG",
      location: "Mumbai, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Retail",
    },
    {
      id: 242,
      title: "FMCG Management Intern",
      location: "Mumbai, Maharashtra",
      jobType: "Internship",
      audience: "Student",
      sector: "Retail",
    },
    {
      id: 243,
      title: "Supply Chain Analyst",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Retail",
    },
    {
      id: 244,
      title: "Key Account Manager",
      location: "Delhi, NCR",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Retail",
    },
    {
      id: 245,
      title: "Consumer Insights Intern",
      location: "Mumbai, Maharashtra",
      jobType: "Internship",
      audience: "Student",
      sector: "Retail",
    },
    {
      id: 246,
      title: "R&D Formulation Scientist",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Retail",
    },
  ],
  "ITC Limited": [
    {
      id: 247,
      title: "Category Head - Agri",
      location: "Hyderabad, Telangana",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Conglomerate",
    },
    {
      id: 248,
      title: "Corporate Strategy Intern",
      location: "Kolkata, West Bengal",
      jobType: "Internship",
      audience: "Student",
      sector: "Conglomerate",
    },
    {
      id: 249,
      title: "Digital Transformation Lead",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Conglomerate",
    },
    {
      id: 250,
      title: "FMCG Sales Manager",
      location: "Mumbai, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Conglomerate",
    },
    {
      id: 251,
      title: "Sustainability Intern",
      location: "Remote",
      jobType: "Internship",
      audience: "Student",
      sector: "Conglomerate",
    },
    {
      id: 252,
      title: "Hotels Revenue Manager",
      location: "Chennai, Tamil Nadu",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Conglomerate",
    },
  ],
  "Larsen & Toubro": [
    {
      id: 253,
      title: "Civil Project Manager",
      location: "Mumbai, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Consulting",
    },
    {
      id: 254,
      title: "Engineering Graduate Trainee",
      location: "Chennai, Tamil Nadu",
      jobType: "Internship",
      audience: "Student",
      sector: "Consulting",
    },
    {
      id: 255,
      title: "Electrical Design Engineer",
      location: "Mumbai, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Consulting",
    },
    {
      id: 256,
      title: "Defence Electronics Engineer",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Consulting",
    },
    {
      id: 257,
      title: "Construction Management Intern",
      location: "Hyderabad, Telangana",
      jobType: "Internship",
      audience: "Student",
      sector: "Consulting",
    },
    {
      id: 258,
      title: "EPC Procurement Manager",
      location: "Delhi, NCR",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Consulting",
    },
  ],
  "Axis Bank": [
    {
      id: 259,
      title: "Corporate Banker",
      location: "Mumbai, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Finance",
    },
    {
      id: 260,
      title: "Retail Banking Intern",
      location: "Delhi, NCR",
      jobType: "Internship",
      audience: "Student",
      sector: "Finance",
    },
    {
      id: 261,
      title: "Digital Banking Product Manager",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Finance",
    },
    {
      id: 262,
      title: "NRI Banking Specialist",
      location: "Mumbai, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Finance",
    },
    {
      id: 263,
      title: "Finance & Risk Intern",
      location: "Pune, Maharashtra",
      jobType: "Internship",
      audience: "Student",
      sector: "Finance",
    },
    {
      id: 264,
      title: "IT Security Head",
      location: "Mumbai, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Finance",
    },
  ],
  "Kotak Mahindra Bank": [
    {
      id: 265,
      title: "Private Banker",
      location: "Mumbai, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Finance",
    },
    {
      id: 266,
      title: "Investment Banking Intern",
      location: "Mumbai, Maharashtra",
      jobType: "Internship",
      audience: "Student",
      sector: "Finance",
    },
    {
      id: 267,
      title: "Mortgage Products Manager",
      location: "Gurugram, Haryana",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Finance",
    },
    {
      id: 268,
      title: "Data Science Lead",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Finance",
    },
    {
      id: 269,
      title: "Portfolio Analytics Intern",
      location: "Mumbai, Maharashtra",
      jobType: "Internship",
      audience: "Student",
      sector: "Finance",
    },
    {
      id: 270,
      title: "Digital Payments Engineer",
      location: "Pune, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Finance",
    },
  ],
  "Amazon India": [
    {
      id: 271,
      title: "Senior Software Development Engineer",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "E-Commerce",
    },
    {
      id: 272,
      title: "Software Engineering Intern",
      location: "Hyderabad, Telangana",
      jobType: "Internship",
      audience: "Student",
      sector: "E-Commerce",
    },
    {
      id: 273,
      title: "Marketplace Seller Success Manager",
      location: "Delhi, NCR",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "E-Commerce",
    },
    {
      id: 274,
      title: "Logistics Network Analyst",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "E-Commerce",
    },
    {
      id: 275,
      title: "Data Engineering Intern",
      location: "Bengaluru, Karnataka",
      jobType: "Internship",
      audience: "Student",
      sector: "E-Commerce",
    },
    {
      id: 276,
      title: "AWS Solutions Architect",
      location: "Mumbai, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "E-Commerce",
    },
  ],
  "Microsoft India": [
    {
      id: 277,
      title: "Principal Software Engineer",
      location: "Hyderabad, Telangana",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
    {
      id: 278,
      title: "Software Engineering Intern",
      location: "Bengaluru, Karnataka",
      jobType: "Internship",
      audience: "Student",
      sector: "Technology",
    },
    {
      id: 279,
      title: "Azure Cloud Architect",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
    {
      id: 280,
      title: "AI Researcher",
      location: "Hyderabad, Telangana",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
    {
      id: 281,
      title: "Product Management Intern",
      location: "Hyderabad, Telangana",
      jobType: "Internship",
      audience: "Student",
      sector: "Technology",
    },
    {
      id: 282,
      title: "Enterprise Account Manager",
      location: "Gurugram, Haryana",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
  ],
  "IBM India": [
    {
      id: 283,
      title: "Cloud & Cognitive Software Engineer",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
    {
      id: 284,
      title: "Technology Consulting Intern",
      location: "Pune, Maharashtra",
      jobType: "Internship",
      audience: "Student",
      sector: "Technology",
    },
    {
      id: 285,
      title: "SAP S/4HANA Consultant",
      location: "Hyderabad, Telangana",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
    {
      id: 286,
      title: "Mainframe Developer",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
    {
      id: 287,
      title: "AI & Automation Intern",
      location: "Bengaluru, Karnataka",
      jobType: "Internship",
      audience: "Student",
      sector: "Technology",
    },
    {
      id: 288,
      title: "Blockchain Solutions Lead",
      location: "Mumbai, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Technology",
    },
  ],
  "Accenture India": [
    {
      id: 289,
      title: "Technology Consulting Manager",
      location: "Mumbai, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Consulting",
    },
    {
      id: 290,
      title: "Strategy & Consulting Intern",
      location: "Bengaluru, Karnataka",
      jobType: "Internship",
      audience: "Student",
      sector: "Consulting",
    },
    {
      id: 291,
      title: "Digital Transformation Lead",
      location: "Hyderabad, Telangana",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Consulting",
    },
    {
      id: 292,
      title: "Data & AI Architect",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Consulting",
    },
    {
      id: 293,
      title: "Operations Excellence Intern",
      location: "Pune, Maharashtra",
      jobType: "Internship",
      audience: "Student",
      sector: "Consulting",
    },
    {
      id: 294,
      title: "Security Architecture Lead",
      location: "Delhi, NCR",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Consulting",
    },
  ],
  "Deloitte India": [
    {
      id: 295,
      title: "Senior Audit Manager",
      location: "Mumbai, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Consulting",
    },
    {
      id: 296,
      title: "Finance & Audit Intern",
      location: "Delhi, NCR",
      jobType: "Internship",
      audience: "Student",
      sector: "Consulting",
    },
    {
      id: 297,
      title: "Risk Advisory Consultant",
      location: "Bengaluru, Karnataka",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Consulting",
    },
    {
      id: 298,
      title: "Tax & Regulatory Manager",
      location: "Mumbai, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Consulting",
    },
    {
      id: 299,
      title: "Technology Risk Intern",
      location: "Hyderabad, Telangana",
      jobType: "Internship",
      audience: "Student",
      sector: "Consulting",
    },
    {
      id: 300,
      title: "M&A Deals Analyst",
      location: "Mumbai, Maharashtra",
      jobType: "Full-time",
      audience: "Working Professional",
      sector: "Consulting",
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

// Build JOBS from mockResults so all companies are represented
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
      transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.5) }}
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
          data-ocid="jobs.apply_button"
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
          data-ocid="jobs.filter.tab"
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
        All Companies ({suggestedCompanies.length})
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
          data-ocid="jobs.company.button"
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
            data-ocid="jobs.company.button"
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
            — {JOBS.length} curated roles across {suggestedCompanies.length}{" "}
            companies
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
            <div
              className="flex flex-col items-center justify-center py-16 rounded-xl border border-border bg-card/50"
              data-ocid="jobs.empty_state"
            >
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
              data-ocid="jobs.cancel_button"
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
                {JOBS.length} curated roles across {suggestedCompanies.length}{" "}
                top Indian companies
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
