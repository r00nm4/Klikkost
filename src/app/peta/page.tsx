import PetaClient from "./PetaClient";
import { getKosts } from "@/lib/kostRepository";

export const dynamic = "force-dynamic";

export default async function PetaPage() {
  const kostData = await getKosts();

  return <PetaClient kostData={kostData} />;
}
