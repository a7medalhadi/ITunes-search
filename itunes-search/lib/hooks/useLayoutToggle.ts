"use client";

import { useState, useEffect } from "react";
import { LAYOUT_STORAGE_KEY } from "../config/constants";


export type PodcastLayout = "grid" | "carousel";

export const useLayoutToggle = () => {
  const [layout, setLayout] = useState<PodcastLayout>("grid");

  useEffect(() => {
    // I used try catch here because localStorage can throw an exception if the browser doesn't support localStorage.
    // We don't want our application to crash because of this, so we use a try catch block, jsut to catch the error.
    try {
      const stored = localStorage.getItem(LAYOUT_STORAGE_KEY);
      if (stored === "grid" || stored === "carousel") {
        setLayout(stored);
      }
    } catch (_) {
      // no need to through any error
    }
  }, []);

  const handleLayoutChange = (newLayout: PodcastLayout) => {
    setLayout(newLayout);
    try {
      localStorage.setItem(LAYOUT_STORAGE_KEY, newLayout);
    } catch (_) {
      // no need to through any error
    }
  };

  return {
    layout,
    setLayout: handleLayoutChange,
  };
};
