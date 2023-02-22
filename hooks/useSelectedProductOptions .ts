import { useState, useCallback } from "react";

const useSelectedProductOptions = (options: any) => {
  const [selectedOptions, setSelectedOptions] = useState({
    names: {
      idx: 0,
      value: options.names[0],
    },
    sizes: {
      idx: 0,
      value: options.sizes[0],
    },
    types: {
      idx: 0,
      value: options.types[0],
    },
    sinkers: {
      idx: 0,
      value: options.sinkers[0],
    },
  });

  const handleSelectOption = useCallback(
    (key: string, idx: number, value: string) => {
      setSelectedOptions((prev) => ({ ...prev, [key]: { idx, value } }));
    },
    []
  );

  return { selectedOptions, handleSelectOption };
};

export default useSelectedProductOptions;
