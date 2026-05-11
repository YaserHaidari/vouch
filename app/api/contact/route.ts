import { supabase } from "@/utils/supabase/client";
import { NextResponse } from "next/server";
enum Category {
  general = "general",
  feedback = "feedback",
  report = "report",
  partnership = "partnership",
}
type Body = {
  first_name: string,
  last_name: string,
  email: string,
  subject: string,
  message: string,
  category: Category
}
export async function POST(request: Request) {

  try {
    const body: Body = await request.json()
    const {first_name, last_name, email, subject, message, category} = body

    const { error} = await supabase.from('contact_submissions').insert({first_name:first_name, last_name:last_name, message: message, email: email, subject: subject, category: category})

    if (error){
      return NextResponse.json({error: error.message}, {status: 500})
    }
    return NextResponse.json({message: 'Success'}, {status: 200})
  } catch (error) {
    return NextResponse.json({message: 'Invalid request', error}, {status: 400})
  }
}