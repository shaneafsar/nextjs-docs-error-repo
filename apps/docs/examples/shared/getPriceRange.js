export default function getPriceRange(value, range = 50) {
  const roundedValue = Math.floor(value);
  const lower = roundedValue - (roundedValue % range);
  const upper = lower + range;

  return `${lower}-${upper}`;
}
