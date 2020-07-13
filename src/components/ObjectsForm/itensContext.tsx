import React, { createContext, useState } from "react";

interface data {
  section: number;
  id: number;
}
interface ContextData {
  selectedItems: data[];
  toggleSelectedItem(section: number, id: number): void;
}

const Context = createContext<ContextData>({} as ContextData);

export const ItemsContextProvider: React.FC = ({ children }) => {
  const [selectedItems, setSelectedItems] = useState<data[]>([]);

  function toggleSelectedItem(section: number, id: number) {
    const newItem = { section, id };

    const alreadySelected = selectedItems.findIndex(
      (item) => item.section === section
    );
    if (alreadySelected >= 0) {
      const iqualSelected = selectedItems.findIndex(
        (item) => item.section === section && item.id === id
      );
      if (iqualSelected >= 0) {
        const filteredItems = selectedItems.filter(
          (item) => item.section === section && item.id === id
        );
        setSelectedItems([...filteredItems, newItem]);
      }
    } else {
      setSelectedItems([...selectedItems, newItem]);
    }
  }

  return (
    <Context.Provider value={{ selectedItems, toggleSelectedItem }}>
      {children}
    </Context.Provider>
  );
};

export default Context;
