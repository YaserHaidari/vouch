"use client";
import { useEffect } from "react";

import {supabase} from '@/utils/supabase/client'

export default function Register() {
  useEffect(() => {

    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "https://vouch-2jshkpx1a-yaserhaidaris-projects.vercel.app/auth/callback/",

      },

    });
  }, []);
  return <></>;
}