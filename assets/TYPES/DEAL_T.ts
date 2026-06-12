export type CATEGORY_T =
  | "internet"
  | "transport"
  | "energy"
  | "finance"
  | "investing"
  | "tech"
  | "mobile"
  | "insurance"
  | "phone";

export const CATEGORIES: ["All", ...CATEGORY_T[]] = [
  "All",
  "internet",
  "transport",
  "energy",
  "finance",
  "investing",
  "tech",
  "mobile",
  "insurance",
  "phone",
];



export enum RETURN_TYPE_T {
  credit = 'credit',
  stocks = 'stocks',
  voucher = 'voucher',
  cash = 'cash'

}
export type DEAL_T = {
  uuid: string;
  brand_id: string;
  brand_name: string;
  num: number;
  link: string;
  offer_expiry_date: string;
  requirements: { instructions: string[], initial_deposit: number };
  is_cash_convertible: boolean;
  created_at: string;
  updated_at: string;
  status: string;
  referral_code: string;
  is_referral: boolean;
  popular: boolean;
  category: CATEGORY_T;
  return_type: RETURN_TYPE_T;
  payout_estimate: number;
  note: string;
};
