export enum ReturnType {
  Credit = 'credit',
  Cash = 'cash',
  Stocks = 'stocks',
}
export enum Category {
  Banking = 'banking',
  Internet = 'internet',
  Transport = 'transport',
  Energy = 'energy',
  Finance = 'finance',
  Investing = 'investing',
  Tech = 'tech',
  Mobile = 'mobile',
  Insurance = 'insurance'
}

export type DealStatus = 'active' | 'expired' | 'coming_soon';

export type Deal = {
  brand_name: string;
  brand_id?: string;
  uuid: string;
  created_at: string;
  updated_at: Date;
  num: number;
  status: DealStatus;
  link: string;
  offer_expiry_date: string;
  requirements?: {
    initial_deposit: number;
    instructions: string[];
  };
  return_type: ReturnType;
  is_cash_convertible: boolean;
  payout_estimate: string;
  popular: boolean,
  category: Category,
  bg: string,
  note: string,
  display_name?: string,
  is_approved?: boolean
};

// Maps return_type → emoji for card image area
export const RETURN_TYPE_EMOJI: Record<ReturnType, string> = {
  [ReturnType.Credit]:  '💳',
  [ReturnType.Cash]: '🎟️',
  [ReturnType.Stocks]:  '📈',
};

// Maps return_type → gradient background for card image area
export const RETURN_TYPE_BG: Record<ReturnType, string> = {
  [ReturnType.Credit]:  'linear-gradient(135deg, #0064D2 0%, #004fb0 100%)',
  [ReturnType.Cash]: 'linear-gradient(135deg, #FFD000 0%, #E8BD00 100%)',
  [ReturnType.Stocks]:  'linear-gradient(135deg, #06C167 0%, #039952 100%)',
};

// Change this line in your deals.ts
export const CATEGORIES = ['All', ...Object.values(Category)];
export const SORT_OPTIONS = ['Newest', 'Highest payout', 'A–Z'] as const;
