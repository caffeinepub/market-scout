import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { MarketUpdate } from "../backend.d";
import { CategoryBadge } from "../components/CategoryBadge";
import {
  useCreateUpdate,
  useDeleteUpdate,
  useEditUpdate,
  useGetUpdates,
} from "../hooks/useQueries";
import { formatRelativeDate } from "../utils/formatters";

const CATEGORY_OPTIONS = ["Tech", "Finance", "Health", "Energy", "Crypto"];

interface UpdateFormData {
  title: string;
  category: string;
  summary: string;
  content: string;
  publishedAt: string;
}

const EMPTY_FORM: UpdateFormData = {
  title: "",
  category: "Tech",
  summary: "",
  content: "",
  publishedAt: new Date().toISOString().slice(0, 16),
};

interface UpdateFormModalProps {
  open: boolean;
  editing: MarketUpdate | null;
  onClose: () => void;
}

function UpdateFormModal({ open, editing, onClose }: UpdateFormModalProps) {
  const createUpdate = useCreateUpdate();
  const editUpdate = useEditUpdate();

  const [form, setForm] = useState<UpdateFormData>(() =>
    editing
      ? {
          title: editing.title,
          category: editing.category,
          summary: editing.summary,
          content: editing.content,
          publishedAt: new Date(Number(editing.publishedAt / BigInt(1_000_000)))
            .toISOString()
            .slice(0, 16),
        }
      : EMPTY_FORM,
  );

  // When editing changes, reset form
  const [prevEditing, setPrevEditing] = useState(editing);
  if (editing !== prevEditing) {
    setPrevEditing(editing);
    setForm(
      editing
        ? {
            title: editing.title,
            category: editing.category,
            summary: editing.summary,
            content: editing.content,
            publishedAt: new Date(
              Number(editing.publishedAt / BigInt(1_000_000)),
            )
              .toISOString()
              .slice(0, 16),
          }
        : EMPTY_FORM,
    );
  }

  const isPending = createUpdate.isPending || editUpdate.isPending;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.summary.trim() || !form.content.trim()) {
      toast.error("Please fill all required fields");
      return;
    }

    const publishedAt =
      BigInt(new Date(form.publishedAt).getTime()) * BigInt(1_000_000);

    try {
      if (editing) {
        await editUpdate.mutateAsync({
          id: editing.id,
          title: form.title,
          category: form.category,
          summary: form.summary,
          content: form.content,
          publishedAt,
        });
        toast.success("Update edited successfully");
      } else {
        await createUpdate.mutateAsync({
          title: form.title,
          category: form.category,
          summary: form.summary,
          content: form.content,
          publishedAt,
        });
        toast.success("Update created successfully");
      }
      onClose();
    } catch {
      toast.error("Failed to save update");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-2xl bg-card border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-foreground">
            {editing ? "Edit Update" : "Create Update"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2 space-y-1.5">
              <Label
                htmlFor="title"
                className="text-foreground text-sm font-medium"
              >
                Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                placeholder="Enter update title..."
                className="bg-input border-border text-foreground"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="category"
                className="text-foreground text-sm font-medium"
              >
                Category
              </Label>
              <Select
                value={form.category}
                onValueChange={(v) => setForm((f) => ({ ...f, category: v }))}
              >
                <SelectTrigger
                  id="category"
                  className="bg-input border-border text-foreground"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {CATEGORY_OPTIONS.map((c) => (
                    <SelectItem key={c} value={c} className="text-foreground">
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="publishedAt"
                className="text-foreground text-sm font-medium"
              >
                Published Date
              </Label>
              <Input
                id="publishedAt"
                type="datetime-local"
                value={form.publishedAt}
                onChange={(e) =>
                  setForm((f) => ({ ...f, publishedAt: e.target.value }))
                }
                className="bg-input border-border text-foreground"
              />
            </div>

            <div className="sm:col-span-2 space-y-1.5">
              <Label
                htmlFor="summary"
                className="text-foreground text-sm font-medium"
              >
                Summary <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="summary"
                value={form.summary}
                onChange={(e) =>
                  setForm((f) => ({ ...f, summary: e.target.value }))
                }
                placeholder="Short summary shown on the card..."
                className="bg-input border-border text-foreground resize-none h-20"
                required
              />
            </div>

            <div className="sm:col-span-2 space-y-1.5">
              <Label
                htmlFor="content"
                className="text-foreground text-sm font-medium"
              >
                Content <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="content"
                value={form.content}
                onChange={(e) =>
                  setForm((f) => ({ ...f, content: e.target.value }))
                }
                placeholder="Full update content. Supports **bold**, ## headings, - lists..."
                className="bg-input border-border text-foreground resize-none h-48 font-mono text-xs"
                required
              />
              <p className="text-xs text-muted-foreground">
                Supports **bold**, ## H2, ### H3, - bullet lists
              </p>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1 border-border"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary/90 hover:bg-primary text-primary-foreground"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {editing ? "Saving..." : "Creating..."}
                </>
              ) : editing ? (
                "Save Changes"
              ) : (
                "Create Update"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

interface AdminPageProps {
  onBack: () => void;
}

export function AdminPage({ onBack }: AdminPageProps) {
  const { data: updates, isLoading } = useGetUpdates();
  const deleteUpdate = useDeleteUpdate();

  const [deleteTarget, setDeleteTarget] = useState<MarketUpdate | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<MarketUpdate | null>(null);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteUpdate.mutateAsync(deleteTarget.id);
      toast.success("Update deleted");
    } catch {
      toast.error("Failed to delete update");
    } finally {
      setDeleteTarget(null);
    }
  };

  const openCreate = () => {
    setEditTarget(null);
    setFormOpen(true);
  };

  const openEdit = (update: MarketUpdate) => {
    setEditTarget(update);
    setFormOpen(true);
  };

  const sorted = updates
    ? [...updates].sort((a, b) => Number(b.publishedAt - a.publishedAt))
    : [];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-muted-foreground hover:text-foreground -ml-2"
          >
            <ChevronLeft size={16} className="mr-1" />
            Back
          </Button>
          <div className="h-4 w-px bg-border" />
          <div>
            <h1 className="font-display font-bold text-xl text-foreground">
              Admin Panel
            </h1>
            <p className="text-sm text-muted-foreground">
              {sorted.length} update{sorted.length !== 1 ? "s" : ""} published
            </p>
          </div>
          <div className="ml-auto">
            <Button
              onClick={openCreate}
              className="bg-primary/90 hover:bg-primary text-primary-foreground"
              size="sm"
            >
              <Plus size={14} className="mr-2" />
              Create Update
            </Button>
          </div>
        </motion.div>

        {/* Table */}
        {isLoading ? (
          <div className="space-y-3">
            {["s1", "s2", "s3", "s4", "s5"].map((id) => (
              <Skeleton
                key={id}
                className="h-16 w-full rounded-xl bg-muted/40"
              />
            ))}
          </div>
        ) : sorted.length === 0 ? (
          <div className="text-center py-20 rounded-xl border border-border bg-card">
            <p className="text-muted-foreground text-sm mb-4">No updates yet</p>
            <Button
              onClick={openCreate}
              className="bg-primary/90 hover:bg-primary text-primary-foreground"
              size="sm"
            >
              <Plus size={14} className="mr-2" />
              Create the first update
            </Button>
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/20">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Title
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider w-24">
                      Category
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider w-28 hidden sm:table-cell">
                      Published
                    </th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider w-24">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((update, i) => (
                    <motion.tr
                      key={update.id.toString()}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-b border-border/50 hover:bg-muted/10 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <p className="font-medium text-foreground line-clamp-1">
                          {update.title}
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                          {update.summary}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <CategoryBadge category={update.category} size="sm" />
                      </td>
                      <td className="px-4 py-3 text-muted-foreground text-xs hidden sm:table-cell">
                        {formatRelativeDate(update.publishedAt)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-foreground"
                            onClick={() => openEdit(update)}
                            aria-label={`Edit: ${update.title}`}
                          >
                            <Pencil size={13} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            onClick={() => setDeleteTarget(update)}
                            aria-label={`Delete: ${update.title}`}
                          >
                            <Trash2 size={13} />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Form Modal */}
      <UpdateFormModal
        open={formOpen}
        editing={editTarget}
        onClose={() => {
          setFormOpen(false);
          setEditTarget(null);
        }}
      />

      {/* Delete Confirmation */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(v) => !v && setDeleteTarget(null)}
      >
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display text-foreground">
              Delete Update
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              Are you sure you want to delete &ldquo;{deleteTarget?.title}
              &rdquo;? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-border text-foreground hover:bg-muted/40">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={deleteUpdate.isPending}
            >
              {deleteUpdate.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
