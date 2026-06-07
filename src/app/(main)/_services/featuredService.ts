import type { TabId } from "../_types/featured.types";

export function getServiceCategoryGroup(id: string): Extract<TabId, "writing" | "editing" | "technical"> {
  if (id === "essay-writing" || id === "research") {
    return "writing";
  }
  if (id === "proofreading-editing") {
    return "editing";
  }
  return "technical";
}
