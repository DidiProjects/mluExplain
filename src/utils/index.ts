// Utility functions
export function formatDate(dateString: string, locale = "pt-BR"): string {
  return new Date(dateString).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
