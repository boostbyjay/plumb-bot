export function formatDate(input: string | Date | undefined | null): string {
  if (!input) return "";

  let date: Date;

  if (input instanceof Date) {
    // Preserve calendar date without UTC-to-local timezone shifts
    date = new Date(input.getUTCFullYear(), input.getUTCMonth(), input.getUTCDate());
  } else {
    const str = String(input).trim();
    const parts = str.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (parts) {
      date = new Date(
        parseInt(parts[1], 10),
        parseInt(parts[2], 10) - 1,
        parseInt(parts[3], 10)
      );
    } else {
      date = new Date(str);
    }
  }

  if (isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
