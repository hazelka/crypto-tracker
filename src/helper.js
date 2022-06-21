export function formatPrice(p) {
  if (p < 2) return '$' + p.toFixed(6);
  if (p >= 1000000 && p < 1000000000) return '$' + (p / 1000000).toFixed(3) + 'M';
  if (p > 1000000000) return '$' + (p / 1000000000).toFixed(3) + 'B';
  return '$' + p.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}