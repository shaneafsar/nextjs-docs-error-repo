export default function mapAffinityToOptionalFilter(affinity) {
  const score = Math.ceil(affinity.probability * 100);
  return `${affinity.name}:${affinity.value}<score=${score}>`;
}
