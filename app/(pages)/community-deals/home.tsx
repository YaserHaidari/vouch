



// // ─── Page ─────────────────────────────────────────────────
// export default function CommunityPage() {
//   const [deals, setDeals] = useState<Deal[]>([]);

//   const [activeCategory, setActiveCategory] = useState<string>("All");
//   const [showForm, setShowForm] = useState(false);
//   const [submitted, setSubmitted] = useState(false);
//   const [form, setForm] = useState(EMPTY_FORM);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   async function fetchData() {
//     await supabase
//       .from("community_deals")
//       .select("*")
//       .eq("is_approved", true)
//       .then(({ data }) => {
//         // console.log(data)
//         if (data) setDeals(data as Deal[]);
//       });
//   }
//   // Filter deals by category
//   const filteredDeals =
//     activeCategory === "All"
//       ? deals
//       : 
//       deals.filter((deal) => {
//        deal.category === activeCategory

//   });

//   function capitalize(str: string) {
//     return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
//   }

//   function handleClose() {
//     setShowForm(false);
//     setSubmitted(false);
//     setForm(EMPTY_FORM);
//   }

//   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     if (!form.brand_name || !form.payout_estimate || !form.referral_link)
//       return;

//     const {
//       data: { user },
//     } = await supabase.auth.getUser();
//     const display_name = user?.user_metadata.full_name;
//     fetch("/api/postdeal", {
//       headers: { "content-type": "application/json" },
//       method: "POST",
//       body: JSON.stringify({
//         brand_name: form.brand_name,
//         return_type: form.return_type || null,
//         category: form.category || null,
//         payout_estimate: form.payout_estimate,
//         link: form.referral_link,
//         referral_code: form.referral_code || null,
//         offer_expiry_date: form.offer_expiry_date || null,
//         is_cash_convertible: form.is_cash_convertible,
//         display_name: display_name,
//         note: form.note || null,
//         is_referral: true,
//       }),
//     });

//     setSubmitted(true);
//     setTimeout(() => {
//       handleClose();
//     }, 2500);
//   }

//   const canSubmit =
//     form.brand_name.trim() !== "" &&
//     form.payout_estimate.trim() !== "" &&
//     form.referral_link.trim() !== "";

//   return (
//     <>
//       <NavCard />

//       {/* Hero */}
    //   <PageHero>
    //     <PageHeroInner>
    //       <PageHeroTop>
    //         <PageHeroText>
    //           <Breadcrumb>
    //             <a href="/">Home</a> / Community Referrals
    //           </Breadcrumb>
    //           <PageTitle>Community referrals</PageTitle>
    //           <PageSubtitle>
    //             Deals shared by the Vouch community. Every submission is
    //             reviewed before going live.
    //           </PageSubtitle>
    //         </PageHeroText>
    //         <DealCount>
    //           {deals.length}
    //           <span>community deals</span>
    //         </DealCount>
    //       </PageHeroTop>

//           {/* Category tabs — driven by Category */}
    //       <TabBar>
    //         {CATEGORIES.map((cat) => (
    //           <Tab
    //             key={cat}
    //             $active={activeCategory === cat}
    //             onClick={() => setActiveCategory(cat)}
    //           >
    //             {capitalize(cat)}
    //           </Tab>
    //         ))}
    //       </TabBar>
    //     </PageHeroInner>
    //   </PageHero>

//       {/* Filter bar */}
//       <FilterBar>
//         <FilterInner>
//           <ResultsCount>
//             {filteredDeals.length} referral
//             {filteredDeals.length !== 1 ? "s" : ""}
//           </ResultsCount>
//           <div
//             style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
//           >
//             <PostBtn onClick={() => setShowForm(true)}>
//               + Post a referral
//             </PostBtn>
//           </div>
//         </FilterInner>
//       </FilterBar>

//       {/* Main content */}
//       <PageBody>
//         {filteredDeals.length > 0 ? (
//           <DealsGrid>
//             {filteredDeals.map((deal, i) => (
//               <DealCardComponent
//                 key={deal.uuid}
//                 deal={deal}
//                 note={deal.note ? `Note: ${deal.note}` : ""}
//                 emoji={RETURN_TYPE_EMOJI[deal.return_type] ?? "🎁"}
//                 bg={
//                   RETURN_TYPE_BG[deal.return_type] ??
//                   `linear-gradient(135deg, ${T.navy}, #2d2d2d)`
//                 }
//                 style={{ animationDelay: `${i * 0.05}s` }}
//               />
//             ))}
//           </DealsGrid>
//         ) : (
//           <EmptyState>
//             <div className="icon">🔍</div>
//             <h3>No referrals found</h3>
//             <p>Be the first to post one in this category.</p>
//           </EmptyState>
//         )}
//       </PageBody>

//       {/* Modal */}
//       {showForm && (
//         <Overlay onClick={(e) => e.target === e.currentTarget && handleClose()}>
//           <Modal>
//             <CloseBtn type="button" onClick={handleClose}>
//               ✕
//             </CloseBtn>

//             {submitted ? (
//               <SuccessState>
//                 <div className="icon">✓</div>
//                 <h3>Referral submitted!</h3>
//                 <p>
//                   Our team will review it before it goes live.
//                   <br />
//                   Thanks for contributing to the community!
//                 </p>
//               </SuccessState>
//             ) : (
//               <form onSubmit={handleSubmit}>
//                 <ModalTitle>Post a referral</ModalTitle>
//                 <ModalSub>
//                   Submitted referrals are reviewed by our team before going
//                   live.
//                 </ModalSub>

//                 {/* ── Brand & submitter ── */}
//                 <TwoCol>
//                   <Field>
//                     <Label>Brand name *</Label>
//                     <Input
//                       placeholder="e.g. Boost Mobile"
//                       value={form.brand_name}
//                       onChange={(e) =>
//                         setForm({ ...form, brand_name: e.target.value })
//                       }
//                     />
//                   </Field>
//                 </TwoCol>

//                 {/* ── Links ── */}
//                 <Field>
//                   <Label>Referral link *</Label>
//                   <Input
//                     placeholder="https://..."
//                     value={form.referral_link}
//                     onChange={(e) =>
//                       setForm({ ...form, referral_link: e.target.value })
//                     }
//                   />
//                 </Field>

//                 <Field>
//                   <Label>Referral code</Label>
//                   <Input
//                     placeholder="e.g. SARAH50  (if separate from link)"
//                     value={form.referral_code}
//                     onChange={(e) =>
//                       setForm({ ...form, referral_code: e.target.value })
//                     }
//                   />
//                 </Field>

//                 <Divider />

//                 {/* ── Reward details ── */}
//                 <TwoCol>
//                   <Field>
//                     <Label>Reward / payout *</Label>
//                     <Input
//                       placeholder="e.g. $50 cashback"
//                       value={form.payout_estimate}
//                       onChange={(e) =>
//                         setForm({ ...form, payout_estimate: e.target.value })
//                       }
//                     />
//                   </Field>
//                   <Field>
//                     <Label>Expiry date</Label>
//                     <Input
//                       type="date"
//                       value={form.offer_expiry_date}
//                       min={new Date().toISOString().split("T")[0]}
//                       onChange={(e) =>
//                         setForm({ ...form, offer_expiry_date: e.target.value })
//                       }
//                     />
//                   </Field>
//                 </TwoCol>

//                 <TwoCol>
//                   <Field>
//                     <Label>Return type</Label>
//                     <SelectInput
//                       value={form.return_type}
//                       onChange={(e) =>
//                         setForm({
//                           ...form,
//                           return_type: e.target.value as ReturnType,
//                         })
//                       }
//                     >
//                       <option value="">Select…</option>
//                       {Object.values(ReturnType).map((rt) => (
//                         <option key={rt} value={rt}>
//                           {RETURN_TYPE_EMOJI[rt]} {rt}
//                         </option>
//                       ))}
//                     </SelectInput>
//                   </Field>
//                   <Field>
//                     <Label>Category</Label>
//                     <SelectInput
//                       value={form.category}
//                       onChange={(e) =>
//                         setForm({
//                           ...form,
//                           category: e.target.value as Category,
//                         })
//                       }
//                     >
//                       {CATEGORIES.filter((c) => c !== "All").map((c) => (
//                         <option key={c} value={c}>
//                           {c}
//                         </option>
//                       ))}
//                     </SelectInput>
//                   </Field>
//                 </TwoCol>

//                 <Field>
//                   <CheckboxRow>
//                     <input
//                       type="checkbox"
//                       checked={form.is_cash_convertible}
//                       onChange={(e) =>
//                         setForm({
//                           ...form,
//                           is_cash_convertible: e.target.checked,
//                         })
//                       }
//                     />
//                     Reward is cash-convertible
//                   </CheckboxRow>
//                 </Field>

//                 <Divider />

//                 {/* ── Extra notes ── */}
//                 <Field>
//                   <Label>Note</Label>
//                   <Textarea
//                     placeholder="Any extra details, promo codes, or requirements..."
//                     value={form.note}
//                     onChange={(e) => setForm({ ...form, note: e.target.value })}
//                   />
//                 </Field>

//                 <SubmitBtn type="submit" disabled={!canSubmit}>
//                   Submit for review →
//                 </SubmitBtn>
//               </form>
//             )}
//           </Modal>
//         </Overlay>
//       )}
//     </>
//   );
// }
