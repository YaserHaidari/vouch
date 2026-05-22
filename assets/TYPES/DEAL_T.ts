import {CATEGORY_T} from '@/assets/TYPES/CATEGORY_T'
import {RETURN_TYPE_T} from '@/assets/TYPES/RETURN_TYPE_T'

export interface DEAL_T {
    uuid: string,
    brand_id: string,
    brand_name: string,
    num: number,
    link: string,
    offer_expiry_date: string,
    requirements: [],
    is_cash_convertible: boolean,
    created_at: string,
    updated_at: string,
    status: boolean,
    referral_code: string,
    is_referral: boolean,
    popular: boolean
    category:CATEGORY_T,
    return_type: RETURN_TYPE_T,
    payout_estimate: number,
}