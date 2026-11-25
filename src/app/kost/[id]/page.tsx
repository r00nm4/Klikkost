import KostDetailClient from "./KostDetailClient";
import { getKostById } from "@/lib/kostRepository";

export const dynamic = "force-dynamic";

export default async function KostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const kost = await getKostById(id);

  return <KostDetailClient kost={kost} />;
}
