import { supabase } from "../utils/supabaseClient";
import { ClassicalPiece } from "@/types";

export async function getClassicalPiecesByComposer(
  composer: string,
): Promise<ClassicalPiece[]> {
  // Fetch records that match the title
  const { data, error } = await supabase
    .from("ClassicalDictionary")
    .select("*")
    .ilike("Composer", `%${composer}%`);
  //.order("RANDOM()", { ascending: true });

  if (error) {
    console.error("Error searching by WorkTitle:", error.message);
    return [];
  }
  console.log(data);
  console.log(composer);
  return data || [];
}
