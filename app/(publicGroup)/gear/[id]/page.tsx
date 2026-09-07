import { getGearById } from "../../_action/getGearById";
import GearDetails from "../../_components/gearDetails";

type GearDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function GearDetailsPage({
  params,
}: GearDetailsPageProps) {
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  const { id } = await params;

  const gear = await getGearById(id);

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <GearDetails gear={gear} />
    </main>
  );
}