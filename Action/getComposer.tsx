import { supabase } from "../utils/supabaseClient";
import { ClassicalPiece } from "@/types";

export async function getComposer(): Promise<string[]> {
  const { data, error } = await supabase
    .from("ClassicalPiece")
    .select("Composer")
    .order("Composer", { ascending: true });

  if (error) {
    console.error("Error retrieving composers:", error.message);
    return [];
  }

  // Extracting unique Composer names from the data
  const composerSet = new Set(data.map((item) => item.Composer));
  const uniqueComposers = Array.from(composerSet);
  console.log(uniqueComposers);
  return uniqueComposers;
}
