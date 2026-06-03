"use client";
import { useState } from "react";
import styles from "./contactpageform.module.css";

// ─── Types ────────────────────────────────────────────────
enum Category {
  general = "general",
  feedback = "feedback",
  report = "report",
  partnership = "partnership",
}

const CONTACT_TYPES: { label: string; value: Category }[] = [
  { label: "General enquiry", value: Category.general },
  { label: "Feedback",        value: Category.feedback },
  { label: "Report a deal",   value: Category.report },
  { label: "Partnership",     value: Category.partnership },
];

// ─── Page ─────────────────────────────────────────────────
export const ContactPageForm = () => {
  const [contactType, setContactType] = useState<Category>(Category.general);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    subject: "",
    message: "",
    category: Category.general,
  });

  const canSubmit = form.first_name && form.email && form.message;

  async function handleSubmitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Something went wrong. Please try again.");
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  const handleReset = () => {
    setSubmitted(false);
    setError(null);
    setForm({
      first_name: "",
      last_name: "",
      email: "",
      subject: "",
      message: "",
      category: Category.general,
    });
    setContactType(Category.general);
  };

  return (
    <div className={styles.pageBody}>
      <div className={styles.leftPanel}>
        <div>
          <p className={styles.sectionLabel}>Contact us</p>
          <h2 className={styles.leftHeading}>
            We're here
            <br />
            to <span>help.</span>
          </h2>
          <p className={styles.leftBody}>
            Whether you've spotted a great referral deal, have feedback on
            Vouch, or want to explore a partnership — reach out and we'll get
            back to you within 1–2 business days.
          </p>
        </div>

        <div className={styles.contactCardGrid}>
          <div className={styles.contactCard}>
            <div className={styles.contactIcon}>⏱️</div>
            <div className={styles.contactCardText}>
              <h4>Response time</h4>
              <p>Usually within 1–2 business days</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.formCard}>
        {submitted ? (
          <div className={styles.successState}>
            <div className={styles.successIcon}>✓</div>
            <h3>Message sent!</h3>
            <p>
              Thanks for reaching out. We'll get back to you within 1–2
              business days.
            </p>
            <button
              className={styles.submitBtn}
              style={{ width: "auto", padding: "0.6rem 1.5rem", marginTop: "0.5rem" }}
              onClick={handleReset}
            >
              Send another →
            </button>
          </div>
        ) : (
          <>
            <h3 className={styles.formTitle}>Send us a message</h3>
            <p className={styles.formSub}>Fill in the form and we'll get back to you shortly.</p>

            <div className={styles.divider} />

            <form onSubmit={handleSubmitForm}>
              <div className={styles.typeRow}>
                {CONTACT_TYPES.map(({ label, value }) => (
                  <button
                    type="button"
                    key={value}
                    className={`${styles.typeChip} ${contactType === value ? styles.typeChipActive : ""}`}
                    onClick={() => {
                      setContactType(value);
                      setForm({ ...form, category: value });
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className={styles.twoCol}>
                <div className={styles.field}>
                  <label className={styles.label}>First name *</label>
                  <input
                    className={styles.input}
                    placeholder="Alex"
                    value={form.first_name}
                    onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Last name</label>
                  <input
                    className={styles.input}
                    placeholder="Hamilton"
                    value={form.last_name}
                    onChange={(e) => setForm({ ...form, last_name: e.target.value })}
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Email *</label>
                <input
                  className={styles.input}
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Subject</label>
                <input
                  className={styles.input}
                  placeholder={`${CONTACT_TYPES.find((t) => t.value === contactType)?.label} — optional subject`}
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Message *</label>
                <textarea
                  className={styles.textarea}
                  placeholder="Tell us what's on your mind..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>

              <button
                className={styles.submitBtn}
                type="submit"
                disabled={!canSubmit || loading}
              >
                {loading ? "Sending…" : "Send message →"}
              </button>

              {error && <p className={styles.errorText}>{error}</p>}
            </form>
          </>
        )}
      </div>
    </div>
  );
};