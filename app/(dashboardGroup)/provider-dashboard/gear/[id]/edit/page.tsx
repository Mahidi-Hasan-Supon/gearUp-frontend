
import { getCategories } from "@/app/(dashboardGroup)/_action/getCategories";
import EditGearForm from "@/app/(dashboardGroup)/_compunents/editGearFrom";
import { getGearById } from "@/app/(publicGroup)/_action/getGearById";

type EditGearPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditGearPage({
  params,
}: EditGearPageProps) {
  const { id } = await params;

  const [gear, categoryResult] = await Promise.all([
    getGearById(id),
    getCategories(),
  ]);

  if (!gear) {
    return (
      <div className="p-6">
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-destructive">
          Gear not found
        </div>
      </div>
    );
  }

  if (!categoryResult.success) {
    return (
      <div className="p-6">
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-destructive">
          {categoryResult.message}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Edit Gear</h1>

        <p className="mt-2 text-muted-foreground">
          Update your gear information.
        </p>
      </div>

      <EditGearForm
        gear={gear}
        categories={categoryResult.data}
      />
    </div>
  );
}




