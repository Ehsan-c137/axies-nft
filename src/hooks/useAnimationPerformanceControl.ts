import { useState, useEffect, useCallback } from "react";

export type AnimationPerformanceOptionsType = {
  maxCores?: number;
  maxMemoryGB?: number;
  extremeLowCores?: number;
  extremeLowMemoryGB?: number;
  debug?: boolean;
};

export const DEFAULT_OPTIONS = {
  maxCores: 4,
  maxMemoryGB: 4,
  extremeLowCores: 2,
  extremeLowMemoryGB: 2,
  debug: false,
};

const checkShouldAnimationsBeEnabled = (
  hookOptions: AnimationPerformanceOptionsType,
) => {
  const options = { ...DEFAULT_OPTIONS, ...hookOptions };
  const { debug } = options;

  if (typeof window === "undefined" || typeof navigator === "undefined") {
    if (debug)
      console.info(
        "[useAnimationPerformanceControl] Animations enabled: SSR or non-browser environment.",
      );
    return true;
  }

  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (mediaQuery.matches) {
    if (debug)
      console.info(
        "[useAnimationPerformanceControl] Animations disabled: User prefers reduced motion.",
      );
    return false;
  }

  const coreCount = navigator?.hardwareConcurrency;
  const deviceMemoryGB = (navigator as Navigator & { deviceMemory?: number })
    ?.deviceMemory;

  let shouldBeDisabled = false;

  if (
    typeof coreCount !== "undefined" &&
    coreCount <= options.extremeLowCores
  ) {
    if (debug)
      console.info(
        `[useAnimationPerformanceControl] Animations disabled: Extremely low core count (Cores: ${coreCount}).`,
      );
    shouldBeDisabled = true;
  }
  if (
    !shouldBeDisabled &&
    typeof deviceMemoryGB !== "undefined" &&
    deviceMemoryGB <= options.extremeLowMemoryGB
  ) {
    if (debug)
      console.info(
        `[useAnimationPerformanceControl] Animations disabled: Extremely low memory (Memory: ${deviceMemoryGB}GB).`,
      );
    shouldBeDisabled = true;
  }

  if (
    !shouldBeDisabled &&
    typeof coreCount !== "undefined" &&
    typeof deviceMemoryGB !== "undefined"
  ) {
    if (
      coreCount <= options.maxCores &&
      deviceMemoryGB <= options.maxMemoryGB
    ) {
      if (debug)
        console.info(
          `[useAnimationPerformanceControl] Animations disabled: Low specs (Cores: ${coreCount}, Memory: ${deviceMemoryGB}GB).`,
        );
      shouldBeDisabled = true;
    }
  }

  if (!shouldBeDisabled && debug) {
    const coreInfo =
      typeof coreCount !== "undefined" ? `Cores: ${coreCount}` : "Cores: N/A";
    const memoryInfo =
      typeof deviceMemoryGB !== "undefined"
        ? `Memory: ${deviceMemoryGB}GB`
        : "Memory: N/A";
    console.info(
      `[useAnimationPerformanceControl] Animations enabled: Device specs considered sufficient (${coreInfo}, ${memoryInfo}).`,
    );
  }

  return !shouldBeDisabled;
};

export function useAnimationPerformanceControl(
  hookOptions: AnimationPerformanceOptionsType,
) {
  const [animationsEnabled, setAnimationsEnabled] = useState(() =>
    checkShouldAnimationsBeEnabled(hookOptions),
  );

  const evaluateDevicePerformance = useCallback(() => {
    const shouldEnable = checkShouldAnimationsBeEnabled(hookOptions);
    setAnimationsEnabled((prev) =>
      prev === shouldEnable ? prev : shouldEnable,
    );
  }, [hookOptions]);
  useEffect(() => {
    evaluateDevicePerformance();

    const mediaQueryList = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const handleChange = () => {
      evaluateDevicePerformance();
    };

    // Safari <14
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener("change", handleChange);
    } else {
      mediaQueryList.addListener(handleChange);
    }

    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener("change", handleChange);
      } else {
        mediaQueryList.removeListener(handleChange);
      }
    };
  }, [evaluateDevicePerformance]);

  return animationsEnabled;
}
