import { useState } from 'react';

export function useLocalStorage<T>(key: string) {
  // @ts-ignore
  const [storedValue, setStoredValue] = useState<T>(JSON.parse(window.localStorage.getItem(key)));

  const onUpdateValue = (newValue: any) => {
    window.localStorage.setItem(key, JSON.stringify(newValue));
    setStoredValue(newValue);
  };

  return [storedValue, onUpdateValue] as const;
}
