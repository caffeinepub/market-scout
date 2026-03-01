import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import type { MarketUpdate } from "../backend.d";
import { formatRelativeDate } from "../utils/formatters";
import { CategoryBadge } from "./CategoryBadge";

interface UpdateCardProps {
  update: MarketUpdate;
  onClick: (update: MarketUpdate) => void;
  index?: number;
}

export function UpdateCard({ update, onClick, index = 0 }: UpdateCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: "easeOut" }}
      onClick={() => onClick(update)}
      className="group rounded-xl border border-border bg-card p-5 cursor-pointer card-hover shadow-card"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick(update);
        }
      }}
      aria-label={`Read: ${update.title}`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <CategoryBadge category={update.category} />
        <span className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">
          {formatRelativeDate(update.publishedAt)}
        </span>
      </div>

      <h3 className="font-display font-semibold text-foreground text-base leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors">
        {update.title}
      </h3>

      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
        {update.summary}
      </p>

      <div className="mt-4 flex items-center text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
        Read full update
        <ChevronRight size={14} className="ml-1" />
      </div>
    </motion.article>
  );
}

// Skeleton loader
export function UpdateCardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-card">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="h-5 w-16 rounded bg-muted animate-pulse" />
        <div className="h-4 w-16 rounded bg-muted animate-pulse" />
      </div>
      <div className="h-5 w-4/5 rounded bg-muted animate-pulse mb-2" />
      <div className="h-4 w-full rounded bg-muted animate-pulse mb-1" />
      <div className="h-4 w-3/4 rounded bg-muted animate-pulse mb-1" />
      <div className="h-4 w-2/3 rounded bg-muted animate-pulse" />
    </div>
  );
}
