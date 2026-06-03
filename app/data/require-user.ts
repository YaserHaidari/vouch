import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { cache } from "react";

export const requireUser = cache(async () =>{
    const supabase = await createClient()
    const {data: {session}, error} = await supabase.auth.getSession()
    if (error){
        throw new Error(error.message)
    }
    if(session?.user){
        return session
    }
    await new Promise((resolve ) => setTimeout(resolve, 3000))
    redirect("/register")
})