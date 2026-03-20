"use client";

import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768; 

export function useIsMobile() {
  // const [isMobile, setIsMobile] = useState(false);
  // useEffect(() => {
  //   const checkDevice = () => {
  //     setIsMobile(window.matchMedia("(max-width: 768px)").matches);
  //   };
  //   checkDevice();
  //   window.addEventListener("resize", checkDevice);
  //   return () => window.removeEventListener("resize", checkDevice);
  // }, []);
  // return isMobile;
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    setIsMobile(mql.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);

    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return isMobile;
}