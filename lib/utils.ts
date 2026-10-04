/**
 * Next.js application utility helpers
 */

export function formatCurrency(amount: number): string {
  return `${amount.toLocaleString()} ₴`;
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return `${text.slice(0, length)}...`;
}
