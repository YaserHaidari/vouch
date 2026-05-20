"use client";
import { CATEGORIES } from "@/app/lib/deals";
import { TabBar, Tab } from "@/assets/btnStyles";

type TabBarFilterProps = {
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
};

export function TabBarFilter({ activeCategory = "All", setActiveCategory }: TabBarFilterProps) {
  function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  return (
    <TabBar>
      {CATEGORIES.map((cat) => (
        <Tab
          key={cat}
          $active={activeCategory === cat}
          onClick={() => setActiveCategory(cat)}
        >
          {capitalize(cat)}
        </Tab>
      ))}
    </TabBar>
  );
}