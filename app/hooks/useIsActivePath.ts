"use client";

import { usePathname } from "next/navigation";

export function useIsActivePath(itemUrl: string) {
  const pathname = usePathname();

  if (itemUrl === "/") return pathname === "/";
  return pathname === itemUrl || pathname.startsWith(itemUrl + "/");
}
