import RuteClient from "./RuteClient";
import { getKostById } from "@/lib/kostRepository";

export const dynamic = "force-dynamic";

export default async function RutePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const kost = await getKostById(id);

  return <RuteClient kost={kost} />;
}
