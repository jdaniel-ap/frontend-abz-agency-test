/// <reference types="vite/client" />

// Declaraciones para módulos de fuentes
declare module "@fontsource-variable/*" {
  const content: void;
  export default content;
}

// Declaraciones para CSS Modules SCSS
declare module "*.module.scss" {
  const content: Record<string, string>;
  export default content;
}

// Declaraciones para archivos SCSS regulares
declare module "*.scss" {
  const content: Record<string, string>;
  export default content;
}

/// <reference types="react" />

declare module "*.svg?react" {
  import * as React from "react";
  const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;
  export default ReactComponent;
}
