import type { AuthUser } from "@/lib/types/auth.type";
import type { ReactNode } from "react";

export interface AuthProviderProps {
  initialUser: AuthUser | null;
  children: ReactNode;
}