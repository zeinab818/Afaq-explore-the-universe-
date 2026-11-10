import MoonClient from "./MoonClient";

interface MoonPageProps {
  searchParams: Promise<{
    lat?: string;
    lon?: string;
    year?: string;
    month?: string;
  }>;
}

export default async function MoonPage({ searchParams }: MoonPageProps) {
  const params = await searchParams;

  return <MoonClient initialParams={params} />;
}
