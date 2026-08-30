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
  const { id } = await params;

  const gear = await getGearById(id);

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <GearDetails gear={gear} />
    </main>
  );
}