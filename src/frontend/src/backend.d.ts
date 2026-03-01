import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface UserPrefs {
    followedCategories: Array<string>;
    userId: Principal;
    lastVisitTime: bigint;
}
export interface MarketUpdate {
    id: bigint;
    title: string;
    content: string;
    authorId: Principal;
    publishedAt: bigint;
    summary: string;
    category: string;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createUpdate(title: string, category: string, summary: string, content: string, publishedAt: bigint): Promise<bigint>;
    deleteUpdate(id: bigint): Promise<void>;
    editUpdate(id: bigint, title: string, category: string, summary: string, content: string, publishedAt: bigint): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getNewUpdatesCount(): Promise<bigint>;
    getUpdateById(id: bigint): Promise<MarketUpdate | null>;
    getUpdates(): Promise<Array<MarketUpdate>>;
    getUpdatesByCategory(category: string): Promise<Array<MarketUpdate>>;
    getUserPrefs(): Promise<UserPrefs>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    initMarketScoutApp(): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    recordVisit(): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    saveUserPrefs(followedCategories: Array<string>): Promise<void>;
}
