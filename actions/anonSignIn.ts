"use server"
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function anonSignIn(){
    const supabase =  await createClient()
    const {data: {user}, error} = await supabase.auth.signInAnonymously()

    if(error){
        console.log(error.message)
        return NextResponse.json({message:error.message}, {status: 500})
    }
    return NextResponse.json({user}, {status: 200})
}