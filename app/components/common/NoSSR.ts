import dynamic from "next/dynamic";

export const noSsrComponent = (props: () => JSX.Element) =>
  dynamic(() => Promise.resolve(props), {
    ssr: false,
  });
