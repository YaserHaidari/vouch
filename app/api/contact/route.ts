import { supabase } from "@/utils/supabase/client";
import { NextResponse } from "next/server";

type Body = {
  first_name: string,
  last_name: string,
  email: string,
  subject: string,
  message: string,
}
export async function POST(request: Request) {

  try {
    const body: Body = await request.json()
    const {first_name, last_name, email, subject, message} = body


    const { error} = await supabase.from('contact_submissions').insert({first_name:first_name, last_name:last_name, message: message, email: email, subject: subject})
    return NextResponse.json({message: 'Success'}, {status: 200})
  } catch (error) {
    return NextResponse.json({message: 'Invalid request'}, {status: 400})
  }
  // try {
  //   const body = await request.json();
    
  //   // Process your data (e.g., send an email or save to DB)
  //   console.log("Form data received:", body);

  //   return NextResponse.json({ message: "Success" }, { status: 200 });
  // } catch (error) {
  //   return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  // }
}