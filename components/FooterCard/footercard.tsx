import { T } from "@/assets/colors";
import styled from "styled-components";


const Footer = styled.footer`
  background: ${T.navy};
  padding: 3rem 2rem;
`;

const FooterInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.5rem;
`;

const FooterLogo = styled.div`
  font-family: "Bricolage Grotesque", sans-serif;
  font-weight: 800;
  font-size: 1.4rem;
  color: ${T.white};
  display: flex;
  align-items: center;
  gap: 6px;

  span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${T.yellow};
    display: inline-block;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

const FooterLink = styled.a`
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  font-size: 0.85rem;
  transition: color 0.2s;
  &:hover {
    color: rgba(255, 255, 255, 0.9);
  }
`;

const FooterCopy = styled.p`
  color: rgba(255, 255, 255, 0.35);
  font-size: 0.8rem;
  width: 100%;
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  margin-top: 1rem;
`;
export function FooterCard(){
    return(
        <Footer>
        <FooterInner>
          <FooterLogo>
            vouch
            <span />
          </FooterLogo>
          <FooterLinks>
            <FooterLink href="#">About</FooterLink>
            <FooterLink href="#">Privacy Policy</FooterLink>
            <FooterLink href="#">Terms of Use</FooterLink>
            <FooterLink href="#">Contact</FooterLink>
          </FooterLinks>
        </FooterInner>
        <FooterInner style={{ paddingTop: 0 }}>
          <FooterCopy>
            © {new Date().getFullYear()} Vouch. All rights reserved. Made with ❤️ in Australia.
          </FooterCopy>
        </FooterInner>
      </Footer>
    )
}