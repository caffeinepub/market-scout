import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { MarketUpdate } from "../backend.d";
import { formatFullDate, formatRelativeDate } from "../utils/formatters";
import { CategoryBadge } from "./CategoryBadge";

interface UpdateDetailPanelProps {
  update: MarketUpdate | null;
  onClose: () => void;
}

interface ParsedLine {
  type: "h2" | "h3" | "bold-block" | "bullet" | "empty" | "paragraph";
  text: string;
  inlineParts?: { bold: boolean; text: string }[];
  key: string;
}

function parseContent(content: string): ParsedLine[] {
  return content.split("\n").map((line, i) => {
    const key = `${i}-${line.slice(0, 12)}`;
    if (line.startsWith("## ")) {
      return { type: "h2", text: line.slice(3), key };
    }
    if (line.startsWith("### ")) {
      return { type: "h3", text: line.slice(4), key };
    }
    if (line.startsWith("**") && line.endsWith("**") && line.length > 4) {
      return { type: "bold-block", text: line.slice(2, -2), key };
    }
    if (line.startsWith("- ")) {
      return { type: "bullet", text: line.slice(2), key };
    }
    if (line.trim() === "") {
      return { type: "empty", text: "", key };
    }
    const rawParts = line.split(/(\*\*[^*]+\*\*)/g);
    const inlineParts = rawParts.map((p) =>
      p.startsWith("**") && p.endsWith("**")
        ? { bold: true, text: p.slice(2, -2) }
        : { bold: false, text: p },
    );
    return { type: "paragraph", text: line, inlineParts, key };
  });
}

function RenderContent({ content }: { content: string }) {
  const lines = parseContent(content);
  return (
    <>
      {lines.map((line) => {
        switch (line.type) {
          case "h2":
            return (
              <h2
                key={line.key}
                className="font-display font-bold text-lg text-foreground mt-6 mb-2"
              >
                {line.text}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={line.key}
                className="font-display font-semibold text-base text-foreground mt-4 mb-1"
              >
                {line.text}
              </h3>
            );
          case "bold-block":
            return (
              <p key={line.key} className="font-semibold text-foreground mb-2">
                {line.text}
              </p>
            );
          case "bullet":
            return (
              <li
                key={line.key}
                className="text-muted-foreground text-sm leading-relaxed ml-4 mb-1 list-disc"
              >
                {line.text}
              </li>
            );
          case "empty":
            return <div key={line.key} className="h-2" />;
          default:
            return (
              <p
                key={line.key}
                className="text-muted-foreground text-sm leading-relaxed mb-2"
              >
                {line.inlineParts?.map((p, pi) =>
                  p.bold ? (
                    // biome-ignore lint/suspicious/noArrayIndexKey: static inline text parts
                    <strong key={pi} className="text-foreground font-semibold">
                      {p.text}
                    </strong>
                  ) : (
                    // biome-ignore lint/suspicious/noArrayIndexKey: static inline text parts
                    <span key={pi}>{p.text}</span>
                  ),
                )}
              </p>
            );
        }
      })}
    </>
  );
}

export function UpdateDetailPanel({ update, onClose }: UpdateDetailPanelProps) {
  return (
    <AnimatePresence>
      {update && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.aside
            key="panel"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-xl bg-card border-l border-border shadow-glow-lg z-50 flex flex-col"
            role="complementary"
            aria-label="Update details"
          >
            {/* Panel header */}
            <div className="flex items-center justify-between p-5 border-b border-border">
              <div className="flex items-center gap-3">
                <CategoryBadge category={update.category} />
                <span className="text-xs text-muted-foreground">
                  {formatRelativeDate(update.publishedAt)}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                aria-label="Close panel"
              >
                <X size={16} />
              </Button>
            </div>

            {/* Content */}
            <ScrollArea className="flex-1">
              <div className="p-6">
                <h2 className="font-display font-bold text-xl text-foreground leading-snug mb-2">
                  {update.title}
                </h2>
                <p className="text-xs text-muted-foreground mb-6">
                  Published {formatFullDate(update.publishedAt)}
                </p>

                {/* Summary highlight */}
                <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 mb-6">
                  <p className="text-sm font-medium text-foreground/90 leading-relaxed">
                    {update.summary}
                  </p>
                </div>

                {/* Full content */}
                <div className="space-y-1">
                  <RenderContent content={update.content} />
                </div>
              </div>
            </ScrollArea>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
