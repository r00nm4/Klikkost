import TersimpanClient from "./TersimpanClient";
import { getKosts } from "@/lib/kostRepository";

export const dynamic = "force-dynamic";

export default async function TersimpanPage() {
  const kostData = await getKosts();

  return <TersimpanClient kostData={kostData} />;
}
