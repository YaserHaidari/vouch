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



export enum REWARD_TYPE_T {
  credit = 'credit',
  stocks = 'stocks',
  voucher = 'voucher',
  cash = 'cash'

}

export type DEAL_T = {
  id: string;
  brand_id: string;
  deal_title: string;
  category: CATEGORY_T;
  brand_name: string;
  link: string;
  status: 'active' | 'expired' ;
  deal_type: 'referral' | 'saving'
  popular: boolean;
  offer_expiry_date: string;
  reward_type: REWARD_TYPE_T;
  deal_summary: string,
  reward_value: number,
  created_at: string;
  note: string;
  user_id: string;
  requirements: {instructions: [], min_cost: number};
  deal_ref: DEAL_REF_T | null
  deal_sav: DEAL_SAV_T | null
};

export type DEAL_REF_T = {
  deal_id: string,
  referral_code: string,
  is_cash_convertible: boolean,
  requirements: {instructions: [], min_cost: number},
  initial_deposit: number,
}

export type DEAL_SAV_T = {
  deal_id: string,
  min_contract_length: number,
  requirements: {instructions: [], min_cost: number},
}
