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