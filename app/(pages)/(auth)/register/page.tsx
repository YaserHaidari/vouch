"use client";
import { useEffect } from "react";

import {supabase} from '@/utils/supabase/client'

export default function Register() {
  useEffect(() => {

    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        // redirectTo: "http://localhost:3000/auth/callback/",
        redirectTo: window.location.origin

      },

    });
  }, []);
  return <></>;
}