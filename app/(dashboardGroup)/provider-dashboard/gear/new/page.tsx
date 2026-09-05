import { getCategories } from "@/app/(dashboardGroup)/_action/getCategories";
import AddGearForm from "@/app/(dashboardGroup)/_compunents/addGearFrom";


export default async function AddNewGearPage() {
  const result = await getCategories();

  return (
    <div className="mx-auto max-w-3xl p-6">

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Add New Gear
        </h1>

        <p className="mt-2 text-muted-foreground">
          Add your equipment to make it available for rental.
        </p>
      </div>

      {!result.success ? (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-destructive">
          {result.message}
        </div>
      ) : (
        <AddGearForm categories={result.data} />
      )}

    </div>
  );
}