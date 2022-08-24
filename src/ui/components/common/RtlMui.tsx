import React from "react";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const RtlMui: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties | undefined;
}> = ({ children, style }) => {
  return (
    <CacheProvider value={cacheRtl}>
      <div dir="rtl" style={style}>
        {children}
      </div>
    </CacheProvider>
  );
};

export default RtlMui;
