import styled from "styled-components";
import { T } from "@/assets/colors";
import { pulse } from "@/assets/animations";
import { createClient } from "@/utils/supabase/server";
import { MobileNav } from "./MobileNav";
import { Menu, X } from "lucide-react";




export async function NavCard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
<>
        
        {/* <Logo>
          <a href="/">vouch</a>
          <span />
        </Logo> */}
        <MobileNav isUser={!!user} />
</>
  );
}