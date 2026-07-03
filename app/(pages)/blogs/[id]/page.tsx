import { blog1 } from "@/app/blogs/blog1";
import { blog2 } from "@/app/blogs/blog2";
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
    blog1,
    blog2
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
                <Link key={i} href={item.link ? item.link : '/'} style={styles.linkRow}>
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
    fontSize: "1rem",
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
    fontSize: "1.2rem",
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
    fontSize: "1.1rem",
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
