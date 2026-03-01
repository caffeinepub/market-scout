export function formatRelativeDate(nanoseconds: bigint): string {
  const ms = Number(nanoseconds / BigInt(1_000_000));
  const now = Date.now();
  const diff = now - ms;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);

  if (seconds < 60) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return "yesterday";
  if (days < 7) return `${days} days ago`;
  if (weeks === 1) return "1 week ago";
  if (weeks < 5) return `${weeks} weeks ago`;
  if (months === 1) return "1 month ago";
  return `${months} months ago`;
}

export function formatFullDate(nanoseconds: bigint): string {
  const ms = Number(nanoseconds / BigInt(1_000_000));
  return new Date(ms).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const CATEGORIES = ["All"] as const;
export type Category = (typeof CATEGORIES)[number];

export function getCategoryBadgeClass(category: string): string {
  const map: Record<string, string> = {
    Tech: "badge-tech",
    Finance: "badge-finance",
    Health: "badge-health",
    Energy: "badge-energy",
    Crypto: "badge-crypto",
    All: "badge-all",
  };
  return map[category] ?? "badge-all";
}

export function getCategoryDotColor(category: string): string {
  const map: Record<string, string> = {
    Tech: "bg-[oklch(0.65_0.22_245)]",
    Finance: "bg-[oklch(0.68_0.18_155)]",
    Health: "bg-[oklch(0.62_0.2_295)]",
    Energy: "bg-[oklch(0.72_0.2_60)]",
    Crypto: "bg-[oklch(0.78_0.18_95)]",
  };
  return map[category] ?? "bg-primary";
}
