

export default function LoadingSkeleton() {
  return (
    <>
      {/* Plain div mimicking NavCard height */}

      {/* Plain div mimicking PageHero */}
      <div style={{ background: "#0a1628", padding: "2.5rem 2rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          {/* Breadcrumb skeleton */}
          <div style={{ height: "12px", width: "120px", background: "rgba(255,255,255,0.1)", borderRadius: "6px", marginBottom: "1rem" }} />
          {/* Title skeleton */}
          <div style={{ height: "32px", width: "200px", background: "rgba(255,255,255,0.15)", borderRadius: "8px", marginBottom: "0.75rem" }} />
          {/* Subtitle skeleton */}
          <div style={{ height: "16px", width: "340px", background: "rgba(255,255,255,0.1)", borderRadius: "6px" }} />
          {/* Tab bar skeleton */}
          <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
            {["All", "", "", ""].map((_, i) => (
              <div key={i} style={{ height: "32px", width: i === 0 ? "48px" : "80px", background: "rgba(255,255,255,0.1)", borderRadius: "20px" }} />
            ))}
          </div>
        </div>
      </div>

      {/* Deal card skeletons */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "2.5rem 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.5rem" }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} style={{
              height: "340px",
              borderRadius: "16px",
              background: "linear-gradient(90deg, #f0f0f0 25%, #f8f8f8 50%, #f0f0f0 75%)",
              backgroundSize: "800px 100%",
              animation: "shimmer 1.4s infinite",
            }} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
      `}</style>
    </>
  );
}