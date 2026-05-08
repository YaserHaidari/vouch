import React from "react";
import styled from "styled-components";

// Use the same tokens from your main page
const T = {
  navy: "#1A1A2E",
  grey100: "#F0F1F3",
  grey200: "#E2E4E9",
  grey400: "#9DA3AE",
  grey600: "#5A6172",
  white: "#FFFFFF",
  yellow: "#FFD000",
};

const Card = styled.div`
  border: 1.5px solid ${T.grey200};
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.25s, box-shadow 0.25s;
  background: ${T.white};

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.09);
  }
`;

const Header = styled.div<{ $bg?: string }>`
  background: ${(p) => p.$bg || T.navy};
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  font-family: "Bricolage Grotesque", sans-serif;
  font-weight: 800;
  font-size: 1.2rem;
  color: ${T.white};
`;

const Category = styled.span`
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.75);
  background: rgba(255, 255, 255, 0.15);
  padding: 0.25rem 0.65rem;
  border-radius: 100px;
`;

const Body = styled.div`
  padding: 1.4rem;
`;

const Title = styled.h3`
  font-family: "Bricolage Grotesque", sans-serif;
  font-weight: 700;
  font-size: 1rem;
  color: ${T.navy};
  margin-bottom: 0.4rem;
`;

const Desc = styled.p`
  font-size: 0.85rem;
  color: ${T.grey600};
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid ${T.grey100};
`;

const Bonus = styled.div`
  .label {
    font-size: 0.72rem;
    color: ${T.grey400};
    font-weight: 500;
  }
  .value {
    font-family: "Bricolage Grotesque", sans-serif;
    font-size: 1.1rem;
    font-weight: 800;
    color: ${T.navy};
  }
`;

const SignUpLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: ${T.yellow};
  color: ${T.navy};
  font-weight: 700;
  font-size: 0.85rem;
  padding: 0.5rem 1.1rem;
  border-radius: 8px;
  text-decoration: none;
  transition: background 0.2s, transform 0.15s;

  &:hover {
    background: #e8bd00;
    transform: translateY(-1px);
  }
`;

// Interface to type your props
interface DealCardProps {
  brandName: string;
  category: string;
  description: string | string[];
  payout: string | number;
  link: string;
  bg?: string;
  brandLogoText?: string;
}

export const DealCard = (props: DealCardProps) => {
  const { brandName,category, description, payout,link, bg} = props

  return (
    <Card>
      <Header $bg={bg}>
        <Logo>{brandName}</Logo>
        <Category>{category}</Category>
      </Header>
      <Body>
        <Title>{brandName}</Title>
        <Desc>{description}</Desc>
        <Footer>
          <Bonus>
            <div className="label">You get</div>
            <div className="value">${payout}</div>
          </Bonus>
          <SignUpLink href={link}>Sign up →</SignUpLink>
        </Footer>
      </Body>
    </Card>
  );
};