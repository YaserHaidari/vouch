"use client";
import styled, { createGlobalStyle } from "styled-components";
import { T } from "@/assets/colors";
import { supabase } from "@/utils/supabase/client";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'DM Sans', sans-serif;
    background: #ffffff;
    color: #1A1A2E;
    -webkit-font-smoothing: antialiased;
  }
`;

const Page = styled.div`
  min-height: 100vh;
  background: ${T.grey50};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const Card = styled.div`
  background: ${T.white};
  border: 1.5px solid ${T.grey200};
  border-radius: 16px;
  padding: 2.5rem 2rem;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
`;

const Eyebrow = styled.p`
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${T.blue};
  margin-bottom: 0.6rem;
`;

const Title = styled.h1`
  font-family: "Bricolage Grotesque", sans-serif;
  font-size: 1.9rem;
  font-weight: 800;
  color: ${T.navy};
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 0.9rem;
  color: ${T.grey600};
  line-height: 1.6;
  margin-bottom: 1.8rem;
`;

const Benefits = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.8rem;
  padding: 1.2rem;
  background: ${T.grey50};
  border-radius: 12px;
  border: 1px solid ${T.grey200};
`;

const BenefitItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 0.875rem;
  color: ${T.grey600};
  line-height: 1.5;

  .icon {
    font-size: 1rem;
    flex-shrink: 0;
    margin-top: 1px;
  }

  strong {
    color: ${T.navy};
    font-weight: 600;
    display: block;
    font-size: 0.875rem;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 1.2rem;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: ${T.grey200};
  }

  span {
    font-size: 0.75rem;
    color: ${T.grey400};
    font-weight: 500;
    letter-spacing: 0.04em;
    white-space: nowrap;
  }
`;

const GoogleBtn = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 0.8rem 1.4rem;
  border: 1.5px solid ${T.grey200};
  border-radius: 10px;
  background: ${T.white};
  font-family: "DM Sans", sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  color: ${T.navy};
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.15s;

  &:hover {
    border-color: ${T.blue};
    box-shadow: 0 4px 16px rgba(0, 82, 204, 0.1);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const OnlyGoogle = styled.p`
  text-align: center;
  font-size: 0.78rem;
  color: ${T.grey400};
  margin-top: 0.9rem;
`;

const Terms = styled.p`
  text-align: center;
  font-size: 0.75rem;
  color: ${T.grey400};
  margin-top: 1.5rem;
  padding-top: 1.2rem;
  border-top: 1px solid ${T.grey200};
  line-height: 1.6;

  a {
    color: ${T.blue};
    text-decoration: none;
    &:hover { text-decoration: underline; }
  }
`;

export default function Register() {
  const handleGoogleSignIn = () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
  };

  return (
    <>
      <GlobalStyle />
      <Page>
        <Card>
          <Eyebrow>Create your account</Eyebrow>
          <Title>Join Vouch</Title>
          <Subtitle>
            Sign up to unlock member-only deals and share your own.
          </Subtitle>

          <Benefits>
            <BenefitItem>
              <span className="icon">🏷️</span>
              <div>
                <strong>Exclusive community deals</strong>
                Access a private deals page with discounts shared by real members.
              </div>
            </BenefitItem>
            <BenefitItem>
              <span className="icon">✍️</span>
              <div>
                <strong>Post your own deals</strong>
                Found something great? Share it and help the community save.
              </div>
            </BenefitItem>
          </Benefits>

          <Divider><span>Continue with</span></Divider>

          <GoogleBtn onClick={handleGoogleSignIn}>
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign in with Google
          </GoogleBtn>

          <OnlyGoogle>Google sign-in only — no password needed</OnlyGoogle>

          <Terms>
            By continuing, you agree to our{" "}
            Terms of Service and {" "}
            <a href="/privacy-policy">Privacy Policy</a>.
          </Terms>
        </Card>
      </Page>
    </>
  );
}
