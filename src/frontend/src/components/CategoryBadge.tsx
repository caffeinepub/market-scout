import { getCategoryBadgeClass } from "../utils/formatters";

interface CategoryBadgeProps {
  category: string;
  size?: "sm" | "md";
}

export function CategoryBadge({ category, size = "md" }: CategoryBadgeProps) {
  const cls = getCategoryBadgeClass(category);
  const sizeClass =
    size === "sm" ? "text-[10px] px-1.5 py-0.5" : "text-xs px-2.5 py-1";
  return (
    <span
      className={`inline-flex items-center rounded font-semibold tracking-wider uppercase ${sizeClass} ${cls}`}
    >
      {category}
    </span>
  );
}
