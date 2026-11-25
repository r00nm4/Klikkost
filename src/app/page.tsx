import HomePageClient from "./HomePageClient";
import { getKosts } from "@/lib/kostRepository";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const kostData = await getKosts();

  return <HomePageClient kostData={kostData} />;
}
