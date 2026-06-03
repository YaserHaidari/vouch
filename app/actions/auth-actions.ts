"use server";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";

export async function googleSignIn() {
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: `${origin}/auth/callback` },
  });

  return data.url; // just return the URL
}


export async function anonSignIn() {
    const supabase = await createClient();
    const { data: {user}, error } = await supabase.auth.signInAnonymously();

    if (error) {
        return { error: error.message };
    }
    if(user){
      await supabase.auth.updateUser({
        data: {
          displayName: "Guest user"
        }
      })
    }
    return { user };
}