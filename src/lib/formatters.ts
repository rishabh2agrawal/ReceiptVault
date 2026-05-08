export function formatIndianCurrency(amount: number, prefix = '₹'): string {
  const s = Math.floor(amount).toString();
  if (s.length <= 3) return prefix + s;
  const last3 = s.slice(-3);
  const rest = s.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',');
  return prefix + rest + ',' + last3;
}

export function formatDate(dateStr: string): string {
  return dateStr; // Already in dd/MM/yyyy format
}

export function getDaysLabel(days: number | null): string {
  if (days === null) return 'No deadline';
  if (days < 0) return 'Expired';
  if (days === 0) return 'Today!';
  if (days === 1) return 'Tomorrow';
  return `${days} days left`;
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    Electronics: '#818CF8',
    Food: '#FBBF24',
    Fashion: '#C084FC',
    Groceries: '#34D399',
    Other: '#48484A',
  };
  return colors[category] || '#818CF8';
}

export function getCategoryDimColor(category: string): string {
  const colors: Record<string, string> = {
    Electronics: 'rgba(129,140,248,0.15)',
    Food: 'rgba(251,191,36,0.15)',
    Fashion: 'rgba(192,132,252,0.15)',
    Groceries: 'rgba(52,211,153,0.15)',
    Other: 'rgba(72,72,74,0.15)',
  };
  return colors[category] || 'rgba(129,140,248,0.15)';
}
