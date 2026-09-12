import { useCallback, useState } from "react";
import { readStorage, writeStorage } from "../utils/storage.js";

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = readStorage(key, undefined);
    if (stored === undefined) return initialValue;
    if (initialValue && typeof initialValue === "object" && !Array.isArray(initialValue)) {
      if (!stored || typeof stored !== "object" || Array.isArray(stored)) return initialValue;
      return { ...initialValue, ...stored };
    }
    return stored;
  });

  const update = useCallback(
    (next) => {
      setValue((current) => {
        const resolved = typeof next === "function" ? next(current) : next;
        writeStorage(key, resolved);
        return resolved;
      });
    },
    [key],
  );

  return [value, update];
}
