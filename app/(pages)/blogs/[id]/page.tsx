import { Metadata } from "next";
import Link from "next/link";


export const metadata: Metadata = {
  keywords: [
    "bills",
    "NBN",
    "AGL energy",
    "Telstra NBN",
    "best internet provider near me",
    "cheap electricity Australia",
    "energy comparison Australia",
    "save money on bills",
    "cheapest energy supplier",
    "reduce electricity bill",
  ],
  title: "Stop Overpaying: How to Slash Your Energy & Internet Bills | [Vouch]",
  description:
    "Everyday Australians are overpaying on electricity and internet. Learn how to compare energy providers, churn NBN plans, and cut hundreds from your bills each year.",
  robots: {
    index: true,
    follow: true,
  },
};

export default async function Blogpost({ params }: {params: {id: number}}) {
   const blogpost = await params;

  const blogs = [
    {
      id: 1,
      title:
        "Stop Overpaying: The Ultimate Guide to Slashing Your Energy & Internet Bills",
      content: [
        {
          type: "intro",
          text: 'If your monthly bills feel like they are constantly rising, you aren\'t alone. For many of us, the cost of living—specifically energy and internet expenses—has become a significant source of household stress. Whether you are a busy parent juggling family expenses or a young independent individual looking to get ahead, the difference between "just getting by" and saving for your goals often lies in your monthly fixed costs.',
        },
        {
          type: "paragraph",
          text: "The good news? You don't have to sacrifice comfort to save money. By applying a few strategic shifts, you can reclaim hundreds, if not thousands, of dollars a year. Here is your comprehensive guide to taking control of your essential bills.",
        },

        { type: "section", text: "Part 1: Smart Habits for Energy Efficiency" },
        {
          type: "paragraph",
          text: "You don't need expensive solar panels to start seeing a drop in your electricity bill. It starts with changing how you interact with your home's energy.",
        },

        { type: "heading", text: '1. The "Last Resort" Rule' },
        {
          type: "paragraph",
          text: "Dryers are massive energy consumers. Whenever possible, use free, natural energy: the sun. Air-drying clothes might take a bit more planning, but it's a zero-cost habit that significantly lowers your usage.",
        },

        { type: "heading", text: "2. Time Your Usage" },
        {
          type: "paragraph",
          text: 'When signing up to an energy provider understand the rates first. You can provide attach the plan details to chatgpt and try to understand it. If you are on a "Time of Use" (TOU) tariff, your energy provider charges different rates (almost double or more) depending on when you consume electricity. Identify your peak times usually late afternoon from 3pm to 9pm when everyone is back from work cooking and running the TV—and shift heavy-machinery tasks like the dishwasher, washing machine. For example we put everything in the dishwasher by 8pm but we only on turn it after 9pm.',
        },

        { type: "heading", text: "3. Seal the Envelope" },
        {
          type: "paragraph",
          text: "To lower your energy bills, start with your home's envelope. Air leaks around doors and windows force your HVAC system to run longer than necessary. You can easily improve your home's efficiency by sealing these gaps; for as little as $10 at your local bunnings store, you can install door seals that significantly reduce wasted energy.",
        },

        { type: "heading", text: "4. The LED Transition" },
        {
          type: "paragraph",
          text: 'If you haven\'t already, swap every single incandescent or halogen globe in your house for high-quality LEDs. They use a fraction of the power and last years longer. It is the single easiest "set and forget" efficiency upgrade you can make.',
        },

        { type: "section", text: 'Part 2: The Art of "Churning" Providers' },
        {
          type: "paragraph",
          text: 'Loyalty is a virtue, but in the Australian utility market, it is often a liability. Most major providers reserve their best pricing for new customers, leaving long-term customers paying a "loyalty tax" in the form of higher rates.',
        },

        { type: "heading", text: "Energy Comparison" },
        {
          type: "paragraph",
          text: 'Do not just accept the "standard offer" from your current provider. Use government-vetted tools to see exactly what you should be paying: Energy Made Easy (the go-to for most of Australia, especially NSW) or Victorian Energy Compare. Once you find a cheaper rate, use platforms like vouch.net.au to find referral codes when churning between providers every 6 to 12 months.',
        },

        {
          type: "heading",
          text: "The Internet Strategy: Stop Renting, Start Managing",
        },
        {
          type: "paragraph",
          text: "The NBN is a commodity. You shouldn't be paying $119/month for a standard connection if you don't have to. Buy your own hardware—a high-quality, independent router like a Google Nest or ASUS system—so switching providers is seamless. Hunt for introductory promos from providers like Superloop or Origin, which often offer aggressive sign-up discounts (e.g., $30 off per month for the first six months). Set a calendar reminder: when your 6-month discount expires, initiate a switch to the next provider. It takes 15 minutes and can save you hundreds annually.",
        },

        { type: "section", text: "Part 3: Maximizing Every Cent" },
        {
          type: "paragraph",
          text: "Beyond switching, there are hidden ways to squeeze more value out of your bills. Before signing up with a new provider, check Cashrewards or ShopBack for cashback incentives, and check your credit card reward programs for utility payment points. Keep an eye out for EOFY special pricing in June when utility companies push to hit their financial year targets.",
        },
        {
          type: "paragraph",
          text: 'If you find yourself in a genuine financial pinch, do not wait for a default notice. Call your provider\'s support line and ask specifically for their "Hardship Program." Most providers have legal obligations to assist customers in temporary distress, which may include payment extensions or temporary rate freezes.',
        },

        { type: "callout", text: "Your Action Plan for This Weekend" },
        {
          type: "step",
          text: "Audit your lighting: Count your non-LED bulbs and make a plan to replace them.",
        },
        {
          type: "step",
          text: "Run a comparison: Spend 20 minutes on Energy Made Easy or Victorian Energy Compare.",
        },
        {
          type: "step",
          text: "Check your internet: Is your current NBN discount expiring this month? Start scouting for your next provider today.",
        },
        {
            type: "paragraph",
            text: "What is the one bill you find most frustrating to pay every month, and what is one step you are going to take to tackle it this week?",
        },
        {
            type: "paragraph",
            text: "If you need further help, please use our contact page to ask for support.",
        },
        
        
        { type: "section", text: "Resources" },
        {
          type: "link",
          text: "VIC compare",
          link: "https://compare.energy.vic.gov.au/",
        },
        {
          type: "link",
          text: "Energy made easy",
          link: "https://www.energymadeeasy.gov.au/",
        },
        { type: "link", text: "Vouch", link: "https://vouch.net.au/" },
      ],
    },
  ];

  const returnedBlog = blogs.find((blog) => blog.id == blogpost.id);

  if (!returnedBlog) {
    return (
      <main style={styles.page}>
        <div style={styles.container}>
          <h1 style={styles.notFound}>Post not found</h1>
        </div>
      </main>
    );
  }

  let stepCounter = 0;

  return (
    <main style={styles.page}>
      <article style={styles.container}>
        <header style={styles.header}>
          <div style={styles.tag}>Money & Bills</div>
          <h1 style={styles.title}>{returnedBlog.title}</h1>
          <div style={styles.meta}>
            <span>May 2026</span>
            <span style={styles.dot}>·</span>
            <span>8 min read</span>
          </div>
          <div style={styles.divider} />
        </header>

        <div style={styles.body}>
          {returnedBlog.content.map((item, i) => {
            if (item.type === "intro") {
              return (
                <p key={i} style={styles.intro}>
                  {item.text}
                </p>
              );
            }
            if (item.type === "section") {
              return (
                <h2 key={i} style={styles.section}>
                  {item.text}
                </h2>
              );
            }
            if (item.type === "heading") {
              return (
                <h3 key={i} style={styles.heading}>
                  {item.text}
                </h3>
              );
            }
            if (item.type === "paragraph") {
              return (
                <p key={i} style={styles.paragraph}>
                  {item.text}
                </p>
              );
            }
            if (item.type === "callout") {
              stepCounter = 0;
              return (
                <p key={i} style={styles.calloutLabel}>
                  {item.text}
                </p>
              );
            }
            if (item.type === "link") {
              return (
                <Link key={item.link} href={item.link} style={styles.linkRow}>
                  <span>{item.text}</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2A6B4F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </Link>
              );
            }
            if (item.type === "step") {
              stepCounter += 1;
              const num = stepCounter;
              return (
                <div key={i} style={styles.step}>
                  <span style={styles.stepNum}>{num}</span>
                  <p style={styles.stepText}>{item.text}</p>
                </div>
              );
            }
            return null;
          })}
        </div>
      </article>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
    
  page: {
    backgroundColor: "#FAFAF8",
    minHeight: "100vh",
    padding: "3rem 1.5rem 6rem",
    fontFamily: "'Georgia', serif",
  },
  container: {
    maxWidth: "680px",
    margin: "0 auto",
  },
  header: {
    marginBottom: "2.5rem",
  },
  tag: {
    display: "inline-block",
    fontSize: "0.7rem",
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#2A6B4F",
    backgroundColor: "#E1F5EE",
    padding: "4px 10px",
    borderRadius: "4px",
    marginBottom: "1.25rem",
  },
  title: {
    fontFamily: "'Georgia', serif",
    fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
    fontWeight: 700,
    lineHeight: 1.2,
    color: "#1A1A18",
    margin: "0 0 1rem",
    letterSpacing: "-0.02em",
  },
  meta: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: "0.85rem",
    color: "#888780",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "2rem",
  },
  dot: {
    color: "#B4B2A9",
  },
  divider: {
    height: "1px",
    backgroundColor: "#E8E6DF",
  },
  body: {
    paddingTop: "2rem",
  },
  intro: {
    fontFamily: "'Georgia', serif",
    fontSize: "1.15rem",
    lineHeight: 1.8,
    color: "#3A3A38",
    margin: "0 0 1.75rem",
    borderLeft: "3px solid #2A6B4F",
    paddingLeft: "1.25rem",
  },
  paragraph: {
    fontFamily: "'Georgia', serif",
    fontSize: "1.05rem",
    lineHeight: 1.85,
    color: "#3A3A38",
    margin: "0 0 1.5rem",
  },
  section: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: "0.7rem",
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "#2A6B4F",
    margin: "3rem 0 1.25rem",
    paddingBottom: "0.5rem",
    borderBottom: "1px solid #E1F5EE",
  },
  heading: {
    fontFamily: "'Georgia', serif",
    fontSize: "1.25rem",
    fontWeight: 700,
    color: "#1A1A18",
    margin: "2rem 0 0.6rem",
    letterSpacing: "-0.01em",
  },
  calloutLabel: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: "0.7rem",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#5F5E5A",
    margin: "3rem 0 1rem",
  },
  step: {
    display: "flex",
    alignItems: "flex-start",
    gap: "1rem",
    marginBottom: "1rem",
    backgroundColor: "#FFFFFF",
    border: "1px solid #E8E6DF",
    borderRadius: "8px",
    padding: "1rem 1.25rem",
  },
  stepNum: {
    flexShrink: 0,
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    backgroundColor: "#2A6B4F",
    color: "#FFFFFF",
    fontSize: "0.8rem",
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "1px",
  },
  stepText: {
    fontFamily: "'Georgia', serif",
    fontSize: "1rem",
    lineHeight: 1.7,
    color: "#3A3A38",
    margin: 0,
  },
  notFound: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: "1.5rem",
    color: "#888780",
    textAlign: "center",
    paddingTop: "4rem",
  },
  linkRow: {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0.75rem 1rem",
  backgroundColor: "#FFFFFF",
  border: "1px solid #E8E6DF",
  borderRadius: "8px",
  textDecoration: "none",
  color: "#2A6B4F",
  fontFamily: "'Georgia', serif",
  fontSize: "1rem",
  marginBottom: "0.5rem",
} as React.CSSProperties,
};
