export default function LoadingPageSkelton() {
  return (
    <div className="page prose">
      <div className="col-span-9">
        <Title />

        <Paragraph />
        <Paragraph />
        <Paragraph />
        <Paragraph />

        <Heading />

        <Paragraph />
        <Paragraph />
        <Paragraph />

        <Heading />

        <Paragraph />
        <Paragraph />

        <Heading />

        <Paragraph />
        <Paragraph />
        <Paragraph />
        <Paragraph />
        <Paragraph />
      </div>
      <div className="col-span-3">
        <Heading />

        <Paragraph />
        <Paragraph />
      </div>
    </div>
  );
}

function Title() {
  return <div className="mb-6 h-10 w-3/4 animate-pulse rounded bg-gray-200" />;
}

function Heading() {
  return <div className="mt-10 h-8 w-2/3 animate-pulse rounded bg-gray-200" />;
}

function Paragraph() {
  return <div className="mt-6 h-6 w-full animate-pulse rounded bg-gray-200" />;
}
