import { useEffect } from "react";

export const useDebounce = (value: string, callback: () => void, delay: number = 500, ) => {
  useEffect(() => {
    const handler = setTimeout(callback, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
};
