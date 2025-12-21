"use client";

import { useRequireAuth } from "@/hooks";
import { ReactNode } from "react";

interface ClientAuthGuardProps {
  children: ReactNode;
}

export function ClientAuthGuard({ children }: ClientAuthGuardProps) {
  useRequireAuth();

  return <>{children}</>;
}