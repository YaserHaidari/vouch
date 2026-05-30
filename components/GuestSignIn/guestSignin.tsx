"use client";
import { anonSignIn } from "@/actions/anonSignIn";
import { T } from "@/assets/colors";
import styled from "styled-components";

const GoogleBtnStyle = styled.button`
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
  transition:
    border-color 0.2s,
    box-shadow 0.2s,
    transform 0.15s;

  &:hover {
    border-color: ${T.blue};
    box-shadow: 0 4px 16px rgba(0, 82, 204, 0.1);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;
export default function GuestSignInBtn() {
  async function handleGuestSignIn(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await anonSignIn();
      console.log(res.json())
    //   if (res) window.location.href = res.url;
      if (!res?.ok) {
        throw new Error("Error");
      }
    } catch (error) {
        console.log(error)
    }
  }
  return (
    <div>
      <form onSubmit={handleGuestSignIn}>
        <GoogleBtnStyle type={"submit"}>Continue as Guest</GoogleBtnStyle>
      </form>
    </div>
  );
}
