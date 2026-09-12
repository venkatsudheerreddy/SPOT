import React, { useEffect } from "react";

// Inline SVG favicon as data URI — no external asset dependency
const FAVICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#9961f7"/>
  <text x="16" y="22" text-anchor="middle" font-family="system-ui,sans-serif" font-weight="700" font-size="14" fill="white">S</text>
</svg>`;
const FAVICON_DATA_URI = `data:image/svg+xml,${encodeURIComponent(FAVICON_SVG)}`;

export function FaviconHandler() {
  useEffect(() => {
    const setLink = (rel: string, href: string) => {
      let link = document.querySelector(`link[rel*='${rel}']`) as HTMLLinkElement;
      if (!link) {
        link = document.createElement("link");
        link.rel = rel;
        document.head.appendChild(link);
      }
      link.href = href;
    };

    setLink("icon", FAVICON_DATA_URI);
    setLink("apple-touch-icon", FAVICON_DATA_URI);
  }, []);

  return null;
}
