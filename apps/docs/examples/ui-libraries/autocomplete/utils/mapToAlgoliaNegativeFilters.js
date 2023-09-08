export function mapToAlgoliaNegativeFilters(
  tags,
  facetsToNegate,
  operator = "AND"
) {
  return tags
    .map(({ label, facet }) => {
      const filter = `${facet}:"${label}"`;

      return facetsToNegate.includes(facet) && `NOT ${filter}`;
    })
    .filter(Boolean)
    .join(` ${operator} `);
}
