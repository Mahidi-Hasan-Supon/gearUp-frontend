import GearCard from "./_components/GearCard";
import { Gear } from "./_action/getGear";
import HeroSection from "@/components/shared/heroSection";
import FeaturedGear from "@/components/shared/featuredGear";
import PopularCategories from "@/components/shared/popularCategories";
import { getCategories } from "../(dashboardGroup)/_action/getCategories";
import HowItWorks from "@/components/shared/howItWorks";
import WhyChooseGearUp from "@/components/shared/whyChooseGear";
import TopProviders from "@/components/shared/topProvider";
import Statistics from "@/components/shared/statistics";
import FinalCTA from "@/components/shared/finalCTA";
import Footer from "@/components/shared/footer";

type GearResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: Gear[];
};

const gears = await getGears();
const providers = Array.from(
  new Map(
    gears.map((gear) => [
      gear.provider.id,
      {
        id: gear.provider.id,
        name: gear.provider.name,
        email: gear.provider.email,
      },
    ]),
  ).values(),
);

const categoryResult = await getCategories();
async function getGears(): Promise<Gear[]> {
  const response = await fetch(`${process.env.BACKEND_API_URL}/api/gear`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch gears");
  }

  const result: GearResponse = await response.json();

  return result.data;
}

export default async function HomePage() {
const availableGearCount = gears.filter(
  (gear) => gear.status === "AVAILABLE"
).length;
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <HeroSection></HeroSection>

      {/* popular categories */}
      <PopularCategories
        categories={categoryResult.success ? categoryResult.data : []}
      ></PopularCategories>

      {/* Featured Gear */}
      <FeaturedGear></FeaturedGear>

      
      {/* how it works */}
      <HowItWorks></HowItWorks>

      {/* why chose gear */}

      <WhyChooseGearUp></WhyChooseGearUp>

      {/* top Providers */}
      <TopProviders providers={providers}></TopProviders>

      {/* statistics */}
      <Statistics 
      gearCount={availableGearCount}
      providerCount={providers.length}
      categoryCount={categoryResult.success ? categoryResult.data.length : 0}
      ></Statistics>

      {/* finalCTA */}
      <FinalCTA></FinalCTA>
    

      {/* footer */}
      <Footer></Footer>

    </main>
  );
}
