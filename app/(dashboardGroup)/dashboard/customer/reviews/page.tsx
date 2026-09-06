import { getMyReviews } from "@/app/(dashboardGroup)/_action/getMyReviews";
import { Review } from "@/lib/types";
import { Star, Package } from "lucide-react";

export default async function ReviewsPage() {
  const result = await getMyReviews();

  const reviews = result.data ?? [];

  return (
    <div className="mx-auto max-w-6xl p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Reviews</h1>
        <p className="mt-2 text-muted-foreground">
          View all the reviews you have submitted.
        </p>
      </div>

      {/* Empty State */}
      {reviews.length === 0 ? (
        <div className="rounded-2xl border bg-background p-12 text-center shadow-sm">
          <Package className="mx-auto h-12 w-12 text-muted-foreground" />

          <h2 className="mt-4 text-xl font-semibold">No reviews yet</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            You can review your gear after returning it.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {reviews.map((review: Review) => (
            <div
              key={review.id}
              className="overflow-hidden rounded-2xl border bg-background shadow-sm transition hover:shadow-md"
            >
              {/* Gear Image */}
              <div className="h-52 w-full bg-muted">
                {review.gear.image ? (
                  <img
                    src={review.gear.image}
                    alt={review.gear.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Package className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
              </div>

              <div className="p-5">
                {/* Gear Info */}
                <div>
                  <h2 className="text-xl font-bold">{review.gear.title}</h2>

                  <p className="text-sm text-muted-foreground">
                    {review.gear.brand}
                  </p>
                </div>

                {/* Rating */}
                <div className="mt-4 flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}

                  <span className="ml-2 text-sm font-medium">
                    {review.rating}/5
                  </span>
                </div>

                {/* Comment */}
                <div className="mt-4 rounded-xl bg-muted/40 p-4">
                  <p className="text-sm leading-6">“{review.comment}”</p>
                </div>

                {/* Rental Info */}
                <div className="mt-4 border-t pt-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rental Status</span>

                    <span className="font-medium text-green-600">
                      {review.rental.status}
                    </span>
                  </div>

                  <div className="mt-2 flex justify-between">
                    <span className="text-muted-foreground">Rental Period</span>

                    <span className="font-medium">
                      {new Date(review.rental.startDate).toLocaleDateString()}
                      {" - "}
                      {new Date(review.rental.endDate).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="mt-2 flex justify-between">
                    <span className="text-muted-foreground">Reviewed On</span>

                    <span className="font-medium">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
