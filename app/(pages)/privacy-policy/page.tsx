import Link from "next/link";
import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    font-family: 'DM Sans', sans-serif;
    background: #ffffff;
    color: #1A1A2E;
    -webkit-font-smoothing: antialiased;
  }
`;

// Reuse tokens from main site
const T = {
  navy: "#1A1A2E",
  blue: "#0062E6",
  blueLight: "#EBF2FF",
  yellow: "#FFD000",
  yellowLight: "#FFFBE6",
  grey50: "#F8F9FA",
  grey200: "#E2E5EA",
  grey400: "#9BA3AF",
  grey600: "#4B5563",
  white: "#FFFFFF",
};

const PageWrapper = styled.div`
  background: ${T.white};
  min-height: 100vh;
`;

const Header = styled.div`
  background: ${T.grey50};
  border-bottom: 1px solid ${T.grey200};
  padding: 3rem 2rem 2.5rem;
`;

const HeaderInner = styled.div`
  max-width: 760px;
  margin: 0 auto;
`;

const Eyebrow = styled.p`
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${T.blue};
  margin-bottom: 0.6rem;
`;

const PageTitle = styled.h1`
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: clamp(1.8rem, 4vw, 2.4rem);
  font-weight: 800;
  color: ${T.navy};
  letter-spacing: -0.03em;
  margin-bottom: 0.6rem;
`;

const Meta = styled.p`
  font-size: 0.85rem;
  color: ${T.grey400};
`;

const ContentWrapper = styled.div`
  max-width: 760px;
  margin: 0 auto;
  padding: 3rem 2rem 5rem;
`;

const Section = styled.section`
  margin-bottom: 2.8rem;
`;

const SectionTitle = styled.h2`
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 1.15rem;
  font-weight: 700;
  color: ${T.navy};
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid ${T.grey200};
`;

const Body = styled.p`
  font-size: 0.95rem;
  color: ${T.grey600};
  line-height: 1.75;
  margin-bottom: 0.9rem;

  a {
    color: ${T.blue};
    text-decoration: underline;
    text-underline-offset: 2px;
  }
`;

const List = styled.ul`
  list-style: none;
  margin: 0.5rem 0 0.9rem;
  padding: 0;

  li {
    font-size: 0.95rem;
    color: ${T.grey600};
    line-height: 1.7;
    padding: 0.3rem 0 0.3rem 1.2rem;
    position: relative;

    &::before {
      content: "–";
      position: absolute;
      left: 0;
      color: ${T.grey400};
    }
  }
`;

const Callout = styled.div`
  background: ${T.yellowLight};
  border: 1px solid #f0d800;
  border-radius: 10px;
  padding: 1rem 1.2rem;
  margin: 1rem 0;
  font-size: 0.9rem;
  color: #7a5f00;
  line-height: 1.6;
`;

const ContactBox = styled.div`
  background: ${T.blueLight};
  border: 1px solid #c5d9f8;
  border-radius: 10px;
  padding: 1.2rem 1.4rem;
  margin-top: 0.5rem;

  p {
    font-size: 0.9rem;
    color: ${T.navy};
    line-height: 1.6;

    a {
      color: ${T.blue};
      font-weight: 600;
      text-decoration: underline;
      text-underline-offset: 2px;
    }
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${T.grey200};
  margin: 3rem 0;
`;

export default function PrivacyPolicy() {
  return (
    <>
      <GlobalStyle />
      <PageWrapper>
        {/* You can drop <NavCard /> here */}

        <Header>
          <HeaderInner>
            {/* <Eyebrow>Legal</Eyebrow> */}
            <PageTitle>Privacy Policy</PageTitle>
            <Meta>Last updated: May 2026 Vouch</Meta>
          </HeaderInner>
        </Header>

        <ContentWrapper>

          <Section>
            <Body>
              Vouch ("we", "us", "Vouch") is committed to handling your personal information responsibly. This policy explains what data we collect, why we collect it, how it is stored, and your rights in relation to it.
            </Body>
            <Body>
              We operate under the <strong>Australian Privacy Principles (APPs)</strong> contained in the <em>Privacy Act 1988 (Cth)</em>. A copy of the APPs is available at{" "}
              <Link href="https://www.oaic.gov.au/" target="_blank" rel="noopener noreferrer">oaic.gov.au</Link>.
            </Body>
          </Section>

          <Section>
            <SectionTitle>1. Information We Collect</SectionTitle>
            <Body>When you use Vouch, we may collect the following personal information:</Body>
            <List>
              <li>Your name and email address (via Google Sign-In)</li>
              <li>Google profile information provided at the time of authentication (name, profile photo URL, Google account ID)</li>
              <li>IP address and browser/device information for security and analytics purposes</li>
              <li>Usage data such as deals viewed, links clicked, and referral activity on our platform</li>
            </List>
            <Body>
              We do <strong>not</strong> collect passwords. Authentication is handled entirely by Google via OAuth 2.0 — we never see or store your Google password.
            </Body>
          </Section>

          <Section>
            <SectionTitle>2. How We Collect Your Information</SectionTitle>
            <Body>
              We collect information in the following ways:
            </Body>
            <List>
              <li>When you sign in using <strong>Google OAuth</strong> via Supabase Auth</li>
              <li>When you interact with deals, referral links, or features on the platform</li>
              <li>Automatically through cookies and standard server logs when you visit our website</li>
            </List>
          </Section>

          <Section>
            <SectionTitle>3. Why We Collect Your Information</SectionTitle>
            <Body>Your information is collected for the following purposes:</Body>
            <List>
              <li>To authenticate your identity and manage your account</li>
              <li>To personalise your experience and track your referral activity</li>
              <li>To send you relevant communications (you may unsubscribe at any time)</li>
              <li>To improve our platform, deals listings, and user experience</li>
              <li>To comply with applicable laws and prevent fraud</li>
            </List>
          </Section>

          <Section>
            <SectionTitle>4. Data Storage & Onshore Processing</SectionTitle>
            <Body>
              Your personal data is stored using <strong>Supabase</strong>, our backend-as-a-service provider. We have configured our Supabase project to store data <strong>onshore within Australia</strong>. This means your data does not leave Australian borders during normal platform operation.
            </Body>
            <Body>
              We take reasonable technical and organisational steps to protect your data from unauthorised access, disclosure, or misuse.
            </Body>
          </Section>

          <Section>
            <SectionTitle>5. Referral Links & Reward Disclaimer</SectionTitle>
            <Callout>
              <strong>Important:</strong> Referral links and deals listed on Vouch have been tested and verified to the best of our ability at the time of listing. However, we cannot guarantee that every referral will result in a reward. Reward eligibility is ultimately determined by the third-party service provider, not by Vouch.
            </Callout>
            <Body>
              Factors outside our control — such as changes to a provider's referral program, geographic restrictions, or existing account status — may affect whether a reward is granted. We recommend reviewing the terms of each offer directly with the provider before signing up.
            </Body>
            <Body>
              Vouch is not responsible for rewards that are not received due to changes made by third-party providers after our listing is published.
            </Body>
          </Section>

          <Section>
            <SectionTitle>6. Disclosure of Your Information</SectionTitle>
            <Body>We do not sell your personal information. We may share it in limited circumstances:</Body>
            <List>
              <li>With <strong>Supabase</strong> (our infrastructure provider) for authentication and data storage</li>
              <li>With <strong>Google</strong> as part of the OAuth authentication flow</li>
              <li>If required by law, court order, or to protect the rights and safety of Vouch or others</li>
              <li>With your consent, or where disclosure is reasonably necessary for a closely related purpose</li>
            </List>
            <Body>
              We do not share your data with deal or referral partners. Clicking a referral link may expose your IP address and browser information to third-party providers as a standard part of web browsing — this is outside our control.
            </Body>
          </Section>

          <Section>
            <SectionTitle>7. Cookies & Analytics</SectionTitle>
            <Body>
              Our website uses cookies to support authentication sessions and basic analytics. These cookies help us understand how users interact with the platform so we can improve it.
            </Body>
            <Body>
              You can disable cookies in your browser settings. Note that disabling cookies may prevent you from signing in or using certain features of the platform.
            </Body>
          </Section>

          <Section>
            <SectionTitle>8. Accessing or Updating Your Information</SectionTitle>
            <Body>
              You have the right to access, correct, or request deletion of the personal information we hold about you. To make a request, please contact us in writing at the address below.
            </Body>
            <Body>
              We will not charge a fee for access requests, though an administrative fee may apply for producing copies of your information. We may require you to verify your identity before releasing any personal data.
            </Body>
          </Section>

          <Section>
            <SectionTitle>9. Data Retention</SectionTitle>
            <Body>
              We retain your personal information for as long as your account is active or as needed to provide services. If you request account deletion, we will remove your personal data within 30 days, except where retention is required by law.
            </Body>
          </Section>

          <Section>
            <SectionTitle>10. Children's Privacy</SectionTitle>
            <Body>
              Vouch is not directed at individuals under the age of 18. We do not knowingly collect personal information from minors. If you believe a minor has provided us with their data, please contact us and we will promptly remove it.
            </Body>
          </Section>

          <Section>
            <SectionTitle>11. Changes to This Policy</SectionTitle>
            <Body>
              We may update this Privacy Policy from time to time. The current version will always be available at{" "}
              <Link href="https://vouch.net.au/privacy-policy">vouch.net.au/privacy-policy</Link>. Continued use of the platform after changes are published constitutes acceptance of the updated policy.
            </Body>
          </Section>

          <Divider />

          <Section>
            <SectionTitle>Contact & Complaints</SectionTitle>
            <Body>
              If you have questions about this policy or wish to make a privacy complaint, please reach out to us:
            </Body>
            <ContactBox>
              <p>
                🌐 <Link href="/contact">Contact us</Link>
              </p>
            </ContactBox>
            <Body style={{ marginTop: "1rem" }}>
              If you are not satisfied with our response, you may escalate your complaint to the{" "}
              <Link href="https://www.oaic.gov.au/privacy/privacy-complaints" target="_blank" rel="noopener noreferrer">
                Office of the Australian Information Commissioner (OAIC)
              </Link>.
            </Body>
          </Section>

        </ContentWrapper>

        {/* You can drop <FooterCard /> here */}
      </PageWrapper>
    </>
  );
}
