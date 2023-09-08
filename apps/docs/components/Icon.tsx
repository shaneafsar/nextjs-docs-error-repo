export interface IconProps {
  name: "predict" | "recommend" | "search";
}

const icons: Record<IconProps["name"], JSX.Element> = {
  predict: (
    <svg
      className="inline"
      width="20"
      height="20"
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Algolia Predict Logo"
      data-testid="algolia-predict-icon"
    >
      <title>Algolia Predict Logo</title>
      <circle cx="11.55" cy="8.733" r="7.888" fill="#FFA724"></circle>
      <path
        d="m13.944 3.379 2.562 1.478v2.958l-2.562 1.48-2.561-1.48V4.857l2.561-1.478Z"
        fill="#fff"
      ></path>
      <path fill="#36395A" d="M6.198 21.41v-3.38h10.705v3.38z"></path>
    </svg>
  ),
  recommend: (
    <svg
      className="inline"
      width="20"
      height="20"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="presentation"
      aria-label="Algolia Recommend"
      data-testid="algolia-recommend-icon"
    >
      <title>Algolia Recommend</title>
      <path d="m50 65-4 12H34l-4-12h20Z" fill="#36395A"></path>
      <path
        d="M68 32c0 15.464-12.536 28-28 28S12 47.464 12 32 24.536 4 40 4s28 12.536 28 28Z"
        fill="#FF2A6A"
      ></path>
      <path d="M43 34V17L26 34h17Z" fill="#fff"></path>
      <path d="M37 30v17l17-17H37Z" fill="#fff"></path>
    </svg>
  ),
  search: (
    <svg
      className="inline"
      width="20"
      height="20"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Algolia Search Logo"
      data-testid="algolia-search-icon"
    >
      <title>Algolia Search</title>
      <circle cx="40" cy="32" r="28" fill="#5468FF"></circle>
      <rect x="30" y="22" width="20" height="20" rx="10" fill="#fff"></rect>
      <path d="M43 63.5 54.5 60l6 17h-12L43 63.5Z" fill="#36395A"></path>
    </svg>
  ),
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function ({ name }: IconProps) {
  return icons[name];
}
