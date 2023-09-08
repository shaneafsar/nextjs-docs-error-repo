import { Node } from "unist";

type Attribute = {
  name: string;
  value: { value: string; type: string } | any;
  type?: string;
};

export interface UnistNode extends Node {
  type: string;
  name?: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  attributes?: Attribute[];
  children?: UnistNode[];
}

export interface UnistTree extends Node {
  children: UnistNode[];
}
