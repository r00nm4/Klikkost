import AdminClient from "./AdminClient";
import { getKosts } from "@/lib/kostRepository";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const kostData = await getKosts();

  return <AdminClient kostData={kostData} />;
}
