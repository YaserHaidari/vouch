import { Deals } from "@/assets/dealsFunction/deals"
import { DEAL_T } from '@/assets/TYPES/DEAL_T'
import { stat } from "fs"

const statistics: {valueOfDeals: number, numOfDeals: number, popularDeals: DEAL_T[]} = 
{valueOfDeals: 0, numOfDeals: 0, popularDeals: [] }
export default async function Home(){
    const data: DEAL_T[] = await Deals() || []
    statistics.popularDeals = data.filter((value) => {
        return value.popular
    })
    statistics.numOfDeals = data.length - 1
    function calculateTotalValueOfDeals(): number{
        let sum =0;
        data.forEach((item) => {
            sum += item.payout_estimate
        })
        return sum - 1;
    }
    statistics.valueOfDeals = calculateTotalValueOfDeals()

    return(
        <div>
            <h1>{statistics.numOfDeals}</h1>
            <h1>{statistics.valueOfDeals}</h1>
            {statistics.popularDeals.map((deal) => {
                return (
                    <div key={deal.uuid}>
                        <p>{deal.brand_id}</p>
                    </div>
                )
            })}
        </div>
    )
}