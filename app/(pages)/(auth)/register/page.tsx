import "./register.css";
import { GoogleBtn } from "@/components/GoogleBtn/googleBtn";
import Link from "next/link";

export default async function Register() {
  return (
    <div className="reg-page">
      <div className="reg-card">

        <p className="reg-eyebrow">Create your account</p>
        <h1 className="reg-title">Join Vouch</h1>
        <p className="reg-subtitle">
          Sign up to unlock member-only deals and share your own.
        </p>

        <div className="reg-benefits">
          <div className="reg-benefit">
            <div>
              <strong>Exclusive community deals</strong>
              Access a private deals page with discounts shared by real members.
            </div>
          </div>
          <div className="reg-benefit">
            <div>
              <strong>Post your own deals</strong>
              Found something great? Share it and help the community save.
            </div>
          </div>
        </div>

        <div className="reg-divider">
          <span>Continue with</span>
        </div>

        <GoogleBtn />

        <p className="reg-only-google">Google registration — no password needed</p>

        <p className="reg-terms">
          By continuing, you agree to our Terms of Service and{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>.
        </p>

      </div>
    </div>
  );
}