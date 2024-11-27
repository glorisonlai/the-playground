import dynamic from "next/dynamic";

import type { JSX } from "react";

export const noSsrComponent = (props: () => JSX.Element) =>
  dynamic(() => Promise.resolve(props), {
    ssr: false,
  });
