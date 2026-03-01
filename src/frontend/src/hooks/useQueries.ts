import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { MarketUpdate, UserPrefs, UserRole } from "../backend.d";
import { useActor } from "./useActor";

// ─── Market Updates ─────────────────────────────────────────────────────────

export function useGetUpdates() {
  const { actor, isFetching } = useActor();
  return useQuery<MarketUpdate[]>({
    queryKey: ["updates"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getUpdates();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetUpdatesByCategory(category: string) {
  const { actor, isFetching } = useActor();
  return useQuery<MarketUpdate[]>({
    queryKey: ["updates", "category", category],
    queryFn: async () => {
      if (!actor) return [];
      if (category === "All") return actor.getUpdates();
      return actor.getUpdatesByCategory(category);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetUpdateById(id: bigint | null) {
  const { actor, isFetching } = useActor();
  return useQuery<MarketUpdate | null>({
    queryKey: ["update", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getUpdateById(id);
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

export function useGetNewUpdatesCount() {
  const { actor, isFetching } = useActor();
  return useQuery<bigint>({
    queryKey: ["newUpdatesCount"],
    queryFn: async () => {
      if (!actor) return BigInt(0);
      return actor.getNewUpdatesCount();
    },
    enabled: !!actor && !isFetching,
  });
}

// ─── User Auth & Role ────────────────────────────────────────────────────────

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCallerUserRole() {
  const { actor, isFetching } = useActor();
  return useQuery<UserRole>({
    queryKey: ["callerUserRole"],
    queryFn: async () => {
      if (!actor) return "guest" as UserRole;
      return actor.getCallerUserRole();
    },
    enabled: !!actor && !isFetching,
  });
}

// ─── User Preferences ────────────────────────────────────────────────────────

export function useGetUserPrefs() {
  const { actor, isFetching } = useActor();
  return useQuery<UserPrefs | null>({
    queryKey: ["userPrefs"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getUserPrefs();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveUserPrefs() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (followedCategories: string[]) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.saveUserPrefs(followedCategories);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["userPrefs"] });
    },
  });
}

// ─── Record Visit ────────────────────────────────────────────────────────────

export function useRecordVisit() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not authenticated");
      return actor.recordVisit();
    },
  });
}

// ─── Admin: CRUD Updates ─────────────────────────────────────────────────────

export function useCreateUpdate() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      title: string;
      category: string;
      summary: string;
      content: string;
      publishedAt: bigint;
    }) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.createUpdate(
        data.title,
        data.category,
        data.summary,
        data.content,
        data.publishedAt,
      );
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["updates"] });
      void queryClient.invalidateQueries({ queryKey: ["newUpdatesCount"] });
    },
  });
}

export function useEditUpdate() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      id: bigint;
      title: string;
      category: string;
      summary: string;
      content: string;
      publishedAt: bigint;
    }) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.editUpdate(
        data.id,
        data.title,
        data.category,
        data.summary,
        data.content,
        data.publishedAt,
      );
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["updates"] });
    },
  });
}

export function useDeleteUpdate() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.deleteUpdate(id);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["updates"] });
      void queryClient.invalidateQueries({ queryKey: ["newUpdatesCount"] });
    },
  });
}
