import React, { useEffect } from "react";
import faviconIcon from "figma:asset/085b77912e73ee189edb681c8ccda5c8a9e601e3.png";

export function FaviconHandler() {
  useEffect(() => {
    const setLink = (rel: string, href: string) => {
      if (!href) return; // no-op when asset not resolved
      let link = document.querySelector(`link[rel*='${rel}']`) as HTMLLinkElement;
      if (!link) {
        link = document.createElement("link");
        link.rel = rel;
        document.head.appendChild(link);
      }
      link.href = href;
    };

    setLink("icon", faviconIcon);
    setLink("apple-touch-icon", faviconIcon);
  }, []);

  return null;
}
