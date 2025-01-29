import { ReactNode } from "react";

import AppLayout from "@/components/Layouts/AppLayout";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AppLayout>{children}</AppLayout>;
}
