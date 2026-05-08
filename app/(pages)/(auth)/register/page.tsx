"use client";
import Script from "next/script";

export default function Register() {
  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
      />
      <div
        id="g_id_onload"
        data-client_id="923784932483-gkjv4kn8vstoihcd0u6o225p5g7p9tdn.apps.googleusercontent.com"
        data-context="signup"
        data-ux_mode="popup"
        data-login_uri="http://localhost:3000/register/"
        data-auto_prompt="false"
      ></div>
      <div
        className="g_id_signin"
        data-type="standard"
        data-shape="rectangular"
        data-theme="outline"
        data-text="signin_with"
        data-size="large"
        data-logo_alignment="left"
      ></div>
    </>
  );
}