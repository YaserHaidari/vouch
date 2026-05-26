"use client";
import { TabBar, Tab } from "@/assets/btnStyles";
import { CATEGORIES, CATEGORY_T } from "@/assets/types/DEAL_T";

export function TabBarFilter({
  activeCategory,
  onCategoryChange,
}: {
  activeCategory: string;
  onCategoryChange?: (cat: CATEGORY_T | "All") => void;
}) {
  function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  return (
    <TabBar>
      {CATEGORIES.map((cat) => (
        <Tab
          key={cat}
          $active={activeCategory === cat}
          onClick={() => onCategoryChange?.(cat)}
        >
          {capitalize(cat)}
        </Tab>
      ))}
    </TabBar>
  );
}