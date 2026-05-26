import { NavCard } from "@/components/navigation/NavCard/navcard";

export default function Loading() {
  return (
    <>


      {/* Hero skeleton */}
      <div style={{ padding: "5rem 2rem 4rem", maxWidth: "1280px", margin: "0 auto" }}>
        {/* Badge */}
        <div style={{ height: "32px", width: "260px", background: "#f5f0d0", border: "1px solid #e8d87a", borderRadius: "999px", marginBottom: "2rem" }} />

        {/* Title line 1 */}
        <div style={{ height: "52px", width: "420px", background: "#e8e8e8", borderRadius: "8px", marginBottom: "0.75rem" }} />
        {/* Title line 2 - blue */}
        <div style={{ height: "52px", width: "340px", background: "#dce8ff", borderRadius: "8px", marginBottom: "2rem" }} />

        {/* Subtitle lines */}
        <div style={{ height: "16px", width: "480px", background: "#f0f0f0", borderRadius: "4px", marginBottom: "0.5rem" }} />
        <div style={{ height: "16px", width: "440px", background: "#f0f0f0", borderRadius: "4px", marginBottom: "0.5rem" }} />
        <div style={{ height: "16px", width: "360px", background: "#f0f0f0", borderRadius: "4px", marginBottom: "2.5rem" }} />

      </div>

      {/* Stats bar skeleton */}
      <div style={{ background: "#0f1f3d", padding: "3rem 2rem", display: "flex", justifyContent: "center", gap: "6rem" }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
            <div style={{ height: "36px", width: "80px", background: "rgba(245, 216, 0, 0.3)", borderRadius: "6px" }} />
            <div style={{ height: "14px", width: "100px", background: "rgba(255,255,255,0.1)", borderRadius: "4px" }} />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: -800px 0; }
          100% { background-position: 800px 0; }
        }
        [data-shimmer] {
          background: linear-gradient(90deg, #f0f0f0 25%, #f8f8f8 50%, #f0f0f0 75%) !important;
          background-size: 800px 100% !important;
          animation: shimmer 1.4s infinite !important;
        }
      `}</style>
    </>
  );
}