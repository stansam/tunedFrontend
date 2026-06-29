import type { FlatItem } from "../_types/search.types";

export interface SearchDropdownProps {
  query: string;
  isOpen: boolean;
  onSelect: (value: string, path?: string) => void;
  onClose: () => void;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  setFlatItems: (items: FlatItem[]) => void;
}