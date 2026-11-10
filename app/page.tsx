import GalaxyBackground from "@/components/ui/galaxiBackround/GalaxiBackround";
import Hero from './(pages)/hero/page';
import CosmicOverview from "@/components/ui/Sections/CosmicOverview/CosmicOverview";




export default function Home() {
  return (
    <div className="overflow-hidden  bg-background text-foreground">
      
      {/* Galaxy Background */}
      <div className="fixed inset-0 z-0 w-full h-full overflow-hidden">
        <GalaxyBackground />
      </div>

      {/* Main Content */}
      <main className="grid bg-background ">
        <Hero />
      </main>
      <CosmicOverview />

    </div>
  );
}