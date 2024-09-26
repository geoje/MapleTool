import { useState } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setVal] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (val: T | ((val: T) => T)) => {
    try {
      const valueToStore = val instanceof Function ? val(value) : val;
      setVal(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return { value, setValue } as const;
}

export default useLocalStorage;
