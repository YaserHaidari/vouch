import "./loading.css";

export default function Loading() {
  return (
    <div className="sk-page">
      <div className="sk-card">

        {/* Eyebrow */}
        <div className="bone bone--eyebrow" />

        {/* Title */}
        <div className="bone bone--title" />

        {/* Subtitle */}
        <div className="bone bone--subtitle-full" />
        <div className="bone bone--subtitle-short" />

        {/* Benefits box */}
        <div className="sk-benefits">
          <div className="sk-benefit-row">
            <div className="bone bone--icon" />
            <div className="sk-benefit-text">
              <div className="bone bone--benefit-title" />
              <div className="bone bone--benefit-body" />
            </div>
          </div>
          <div className="sk-benefit-row">
            <div className="bone bone--icon" />
            <div className="sk-benefit-text">
              <div className="bone bone--benefit-title" />
              <div className="bone bone--benefit-body" />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="sk-divider">
          <div className="bone bone--divider-label" />
        </div>

        {/* Google button */}
        <div className="bone bone--google-btn" />

        {/* Caption */}
        <div className="sk-caption">
          <div className="bone bone--caption" />
        </div>

        {/* Terms */}
        <div className="sk-terms">
          <div className="bone bone--terms-line1" />
          <div className="bone bone--terms-line2" />
        </div>

      </div>
    </div>
  );
}