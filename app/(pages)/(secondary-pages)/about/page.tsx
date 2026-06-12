export default function About() {
  return (
    <>
      <style>{`
        .about-page { background: #ffffff; min-height: 100vh; font-family: 'DM Sans', sans-serif; color: #1A1A2E; }
        .about-header { background: #F8F9FA; border-bottom: 1px solid #E2E5EA; padding: 3rem 2rem 2.5rem; }
        .about-header-inner { max-width: 760px; margin: 0 auto; }
        .about-page-title { font-size: clamp(1.8rem, 4vw, 2.4rem); font-weight: 800; letter-spacing: -0.03em; margin-bottom: 0.6rem; }
        .about-meta { font-size: 0.85rem; color: #9BA3AF; }
        .about-content { max-width: 760px; margin: 0 auto; padding: 3rem 2rem 5rem; }
        .about-section { margin-bottom: 2.8rem; }
        .about-section-title { font-size: 1.15rem; font-weight: 700; margin-bottom: 0.75rem; padding-bottom: 0.5rem; border-bottom: 2px solid #E2E5EA; }
        .about-body { font-size: 0.95rem; color: #4B5563; line-height: 1.75; margin-bottom: 0.9rem; }
        .about-callout { background: #FFFBE6; border: 1px solid #f0d800; border-radius: 10px; padding: 1rem 1.2rem; margin: 1rem 0; font-size: 0.9rem; color: #7a5f00; line-height: 1.6; }
        .about-divider { border: none; border-top: 1px solid #E2E5EA; margin: 3rem 0; }
      `}</style>

      <div className="about-page">
        <div className="about-header">
          <div className="about-header-inner">
            <h1 className="about-page-title">About us</h1>
            <p className="about-meta">Vouch — who we are and why we built this</p>
          </div>
        </div>

        <div className="about-content">
          <div className="about-section">
            <h2 className="about-section-title">Our mission</h2>
            <p className="about-body">We are a team of recent graduates dedicated to applying our academic knowledge to address real-world challenges facing everyday Australians. As the cost of living keeps increasing, we believe there is a clear need for a centralised, transparent platform where users can easily compare service providers and secure the best possible value.</p>
            <p className="about-body">Our primary goal is to help you eliminate the "loyalty tax" by finding better deals. We are committed to providing clear, data-driven metrics that make evaluating and switching providers simple, transparent, and efficient.</p>
          </div>

          <hr className="about-divider" />

          <div className="about-section">
            <h2 className="about-section-title">A note from the team</h2>
            <div className="about-callout">While we strive to maintain the most current information, please be aware that our platform is maintained by a dedicated team balancing this project alongside full-time professional commitments. As providers frequently update their pricing and promotional offers, we encourage you to verify all specific rewards and rates directly on the provider's official website before making a final decision.</div>
          </div>
        </div>
      </div>
    </>
  );
}