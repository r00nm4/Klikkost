import RiwayatClient from "./RiwayatClient";
import { getKosts } from "@/lib/kostRepository";

export const dynamic = "force-dynamic";

export default async function RiwayatPage() {
  const kostData = await getKosts();

  return <RiwayatClient kostData={kostData} />;
}
