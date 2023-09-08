import React from "react";
import Heading from "./Heading";

const Widget = ({ name, children }) => {
  const childrenArray = React.Children.toArray(children) as any;
  const usage = childrenArray.find((child) => child.type === Widget.Usage);
  const description = childrenArray.find(
    (child) => child.type === Widget.Description
  );
  const examples = childrenArray.find(
    (child) => child.type === Widget.Examples
  );
  const params = childrenArray.find((child) => child.type === Widget.Params);
  const connectorName = childrenArray.find(
    (child) => child.type === Widget.ConnectorName
  );
  const connectorUsage = childrenArray.find(
    (child) => child.type === Widget.ConnectorUsage
  );
  const connectorParametersGroups = childrenArray.find(
    (child) => child.type === Widget.ConnectorParametersGroups
  );
  const connectorInstanceParametersGroups = childrenArray.find(
    (child) => child.type === Widget.ConnectorInstanceParametersGroups
  );
  const connectorExamples = childrenArray.find(
    (child) => child.type === Widget.ConnectorExamples
  );
  const htmlOutput = childrenArray.find(
    (child) => child.type === Widget.HtmlOutput
  );

  return (
    <article>
      {/* Name */}
      {/* <h1
        className={clsx("mt-2 scroll-m-20 text-4xl font-bold tracking-tight",
          sora.className)}
      >
        {name}
      </h1> */}

      {/* Usage */}
      <div>{usage}</div>

      {/* Description */}
      <Heading
        tag="h2"
        className="mt-10 scroll-m-20 pb-1 text-3xl font-semibold tracking-tight first:mt-0"
        id="about-this-widget"
      >
        About this widget
      </Heading>
      <div>{description}</div>

      {/* Examples */}
      <Heading
        tag="h2"
        className="mt-10 scroll-m-20 pb-1 text-3xl font-semibold tracking-tight first:mt-0"
        id="examples"
      >
        Examples
      </Heading>
      <div className="mb-4">{examples}</div>

      {/* Params */}
      <div className="mb-4">{params}</div>

      {/* connectors */}
      <div className="mb-4">{connectorName}</div>
      <div className="mb-4">{connectorUsage}</div>
      <div className="mb-4">{connectorParametersGroups}</div>
      <div className="mb-4">{connectorInstanceParametersGroups}</div>
      <div className="mb-4">{connectorExamples}</div>

      {/* html output */}
      <div className="mb-4">{htmlOutput}</div>
    </article>
  );
};

Widget.Usage = function Usage({ children }) {
  return <>{children}</>;
};

Widget.Description = function Description({ children }) {
  return <>{children}</>;
};

Widget.Examples = function Examples({ children }) {
  return <>{children}</>;
};

Widget.Params = function Params ({ children }) {
  return <>{children}</>;
};

Widget.ConnectorName = function ConnectorName ({ children }) {
  return <>{children}</>;
};

Widget.ConnectorUsage = function ConnectorUsage ({ children }) {
  return <>{children}</>;
};

Widget.ConnectorParametersGroups = function ConnectorParametersGroups({ children }) {
  return <>{children}</>;
};

Widget.ConnectorInstanceParametersGroups = function ConnectorInstanceParametersGroups({ children }) {
  return <>{children}</>;
};

Widget.ConnectorExamples = function ConnectorExamples({ children }) {
  return <>{children}</>;
};

Widget.HtmlOutput = function HtmlOutput({ children }) {
  return <>{children}</>;
};

export default Widget;
