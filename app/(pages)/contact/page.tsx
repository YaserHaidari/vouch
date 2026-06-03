import { NavCard } from "@/components/navigation/NavCard/navcard";
import { ContactPageForm } from "./contactformClient";
import {
  PageHero,
  PageHeroInner,
  PageHeroTop,
  PageHeroText,
  Breadcrumb,
  PageTitle,
  PageSubtitle,
} from "@/assets/pageHeroStyles";
import Link from "next/link";

export default function Contact() {
  return (
    <div>
      <PageHero>
        <PageHeroInner>
          <PageHeroTop>
            <PageHeroText>
              <Breadcrumb>
                <Link href="/">Home</Link> / Contact
              </Breadcrumb>
              <PageTitle>Get in touch</PageTitle>
              <PageSubtitle>
                Have a question, found a great deal, or just want to say hi?
                We'd love to hear from you.
              </PageSubtitle>
            </PageHeroText>
          </PageHeroTop>
        </PageHeroInner>
      </PageHero>
      <ContactPageForm />
    </div>
  );
}
