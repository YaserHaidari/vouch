import { supabase } from "@/utils/supabase/client";

export async function UpVote(uuid: string) {
  const { error } = await supabase.rpc("increment_vote", {
    deal_uuid: uuid,
  });
  if (error) {
    console.error("UpVote error:", error);
    throw error;
  }
}

export async function DownVote(uuid: string) {
  const {error} = await supabase.rpc('decrement_vote', {
    deal_uuid: uuid
  })
   if (error) {
    console.error("UpVote error:", error);
    throw error;
  }
}
