"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { MobileNav } from "./MobileNav";

export function NavCard() {
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setIsUser(!!data?.user);
    });
  }, []);

  return <MobileNav isUser={isUser} />;
}