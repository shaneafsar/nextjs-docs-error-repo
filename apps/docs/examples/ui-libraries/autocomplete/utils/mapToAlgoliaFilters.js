export function mapToAlgoliaFilters(tagsByFacet, operator = "AND") {
  return Object.keys(tagsByFacet)
    .map((facet) => {
      return `(${tagsByFacet[facet]
        .map(({ label }) => `${facet}:"${label}"`)
        .join(" OR ")})`;
    })
    .join(` ${operator} `);
}
