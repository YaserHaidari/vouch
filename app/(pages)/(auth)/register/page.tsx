import styled, { createGlobalStyle } from "styled-components";
import { T } from "@/assets/colors";
import { createClient } from "@/utils/supabase/server";
import { GoogleBtn } from "@/components/GoogleBtn/googleBtn";

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

export default async function Register() {

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

          <GoogleBtn/>

          <OnlyGoogle>Google registration — no password needed</OnlyGoogle>

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
