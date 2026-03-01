import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useGetUserPrefs, useSaveUserPrefs } from "../hooks/useQueries";
import { CATEGORIES } from "../utils/formatters";
import { CategoryBadge } from "./CategoryBadge";

const CATEGORY_DESCS: Record<string, string> = {
  Tech: "Software, AI, semiconductors, and hardware trends",
  Finance: "Markets, macro, banking, and investment news",
  Health: "Biotech, pharma, and healthcare sector updates",
  Energy: "Oil, gas, renewables, and power markets",
  Crypto: "Digital assets, DeFi, and blockchain developments",
};

interface UserPrefsModalProps {
  open: boolean;
  onClose: () => void;
}

export function UserPrefsModal({ open, onClose }: UserPrefsModalProps) {
  const { data: prefs } = useGetUserPrefs();
  const savePrefs = useSaveUserPrefs();
  const [followed, setFollowed] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (prefs) {
      setFollowed(new Set(prefs.followedCategories));
    }
  }, [prefs]);

  const toggle = (cat: string) => {
    setFollowed((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) {
        next.delete(cat);
      } else {
        next.add(cat);
      }
      return next;
    });
  };

  const handleSave = async () => {
    try {
      await savePrefs.mutateAsync(Array.from(followed));
      toast.success("Preferences saved");
      onClose();
    } catch {
      toast.error("Failed to save preferences");
    }
  };

  const filteredCategories = CATEGORIES.filter((c) => c !== "All");

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-display text-foreground">
            Category Preferences
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm">
            Choose which categories appear in your feed.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 my-2">
          {filteredCategories.map((cat) => (
            <div
              key={cat}
              className="flex items-center justify-between rounded-lg border border-border bg-muted/20 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <CategoryBadge category={cat} size="sm" />
                <div>
                  <p className="text-sm font-medium text-foreground">{cat}</p>
                  <p className="text-xs text-muted-foreground">
                    {CATEGORY_DESCS[cat]}
                  </p>
                </div>
              </div>
              <Switch
                id={`pref-${cat}`}
                checked={followed.has(cat)}
                onCheckedChange={() => toggle(cat)}
                aria-label={`Follow ${cat}`}
              />
            </div>
          ))}
        </div>

        {followed.size === 0 && (
          <p className="text-xs text-muted-foreground text-center">
            No categories followed — you will see all updates.
          </p>
        )}

        <div className="flex gap-3 mt-4">
          <Button
            variant="outline"
            className="flex-1 border-border"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="flex-1 bg-primary/90 hover:bg-primary text-primary-foreground"
            onClick={handleSave}
            disabled={savePrefs.isPending}
          >
            {savePrefs.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Preferences"
            )}
          </Button>
        </div>

        <div className="mt-1">
          <Label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
            <Switch
              checked={followed.size === 0}
              onCheckedChange={(checked) => {
                if (checked) setFollowed(new Set());
              }}
              id="follow-all"
              aria-label="Follow all categories"
            />
            <span>Follow all categories (show everything)</span>
          </Label>
        </div>
      </DialogContent>
    </Dialog>
  );
}
