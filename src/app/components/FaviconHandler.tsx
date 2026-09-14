import React, { useEffect } from "react";
const faviconIcon = "/assets/favicon.png";

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
