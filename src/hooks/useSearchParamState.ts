import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useOptimistic, useTransition, useMemo } from "react";

const parseSearchParamsToRecord = (
  searchParamsInstance: URLSearchParams,
): Record<string, string[]> => {
  const paramsRecord: Record<string, string[]> = {};

  searchParamsInstance.forEach((value, key) => {
    if (Object.prototype.hasOwnProperty.call(paramsRecord, key)) {
      paramsRecord[key].push(value);
    } else {
      paramsRecord[key] = [value];
    }
  });
  return paramsRecord;
};

/**
 * manage the state of all URL search parameters with optimistic updates
 *
 * @returns {object} An object containing:
 * - `actualParams`: A record (object) of the current search parameters from the URL (e.g., { category: ['books'], sort: ['price'] }).
 * - `optimisticParams`: A record (object) of the optimistically updated search parameters.
 * - `isPending`: A boolean indicating if a URL transition (router.push) is pending.
 * - `handleParamChange`: A function to update a specific search parameter's value.
 * It takes `paramName` (string), `value` (string), and `checked` (boolean).
 */
export default function useAllSearchParamsState() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const actualParams = useMemo(() => {
    return parseSearchParamsToRecord(searchParams);
  }, [searchParams]);

  const [optimisticParams, setOptimisticParams] = useOptimistic(actualParams);

  /**
   * Handles changes to a specific search parameter's value.
   * This function updates the URL search parameters optimistically.
   *
   * @param {string} paramName - The name of the parameter to update (e.g., "category", "priceRange").
   * @param {string} value - The value to add or remove for the specified parameter (e.g., "electronics", "0-100").
   * @param {boolean} checked - If true, the value is added/ensured for the parameter. If false, the value is removed.
   */
  const handleParamChange = (
    paramName: string,
    value: string,
    checked: boolean,
  ) => {
    const newOptimisticParamsState = { ...optimisticParams };

    const currentValuesForParam = optimisticParams[paramName] || [];
    let newValuesForParam: string[];

    if (checked) {
      if (!currentValuesForParam.includes(value)) {
        newValuesForParam = [...currentValuesForParam, value];
      } else {
        newValuesForParam = [...currentValuesForParam];
      }
    } else {
      newValuesForParam = currentValuesForParam.filter(
        (item) => item !== value,
      );
    }

    if (newValuesForParam.length > 0) {
      newOptimisticParamsState[paramName] = newValuesForParam;
    } else {
      delete newOptimisticParamsState[paramName];
    }

    const newUrlSearchParamsInstance = new URLSearchParams();

    for (const [key, valuesArray] of Object.entries(newOptimisticParamsState)) {
      if (valuesArray && valuesArray.length > 0) {
        valuesArray.forEach((val) =>
          newUrlSearchParamsInstance.append(key, val),
        );
      }
    }
    const newQueryString = newUrlSearchParamsInstance.toString();
    startTransition(() => {
      setOptimisticParams(newOptimisticParamsState);
      router.push(`${pathname}${newQueryString ? `?${newQueryString}` : ""}`);
    });
  };

  return {
    actualParams,
    optimisticParams,
    isPending,
    handleParamChange,
  };
}
