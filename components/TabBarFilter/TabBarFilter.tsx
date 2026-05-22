"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { CATEGORIES } from "@/app/lib/deals";
import { TabBar, Tab } from "@/assets/btnStyles";

export function TabBarFilter({activeCategory}: {activeCategory: string} ){
  const router = useRouter()
  const searchParams = useSearchParams()

  function handleClick(cat: (typeof CATEGORIES)[number]){
    const params = new URLSearchParams(searchParams.toString())
    if(cat == "All")
    {
      params.delete("category")
    } else {
      params.set("category", cat)
    }
    router.push(`?${params.toString()}`);
  }
  function capitalize(str: string){
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  return(
     <TabBar>
       {CATEGORIES.map((cat) => (
         <Tab
           key={cat}
           $active={activeCategory === cat}
           onClick={() => handleClick(cat)}
         >
           {capitalize(cat)}
         </Tab>
       ))}
     </TabBar>
  )
}