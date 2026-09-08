
type RentalStatusBadgeProps = {
  status: string;
};

export default function RentalStatusBadge({
  status,
}: RentalStatusBadgeProps) {
  const statusStyles: Record<string, string> = {
    PLACED:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400",

    CONFIRMED:
      "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400",

    PAID:
      "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400",

    PICKED_UP:
      "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400",

    RETURNED:
      "bg-gray-200 text-gray-700 dark:bg-gray-500/20 dark:text-gray-300",

    CANCELLED:
      "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        statusStyles[status] ||
        "bg-muted text-muted-foreground"
      }`}
    >
      {status}
    </span>
  );
}

