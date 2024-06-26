import {supabase} from "../utils/supabaseClient";
import {ClassicalPiece} from "@/types";

export async function getClassicalPiecesByTitle(
	title: string,
): Promise<ClassicalPiece[]> {
	// Fetch records that match the title
	const {data, error} = await supabase
		.from("ClassicalDictionary")
		.select("*")
		.ilike("WorkTitle", `%${title}%`)
		.order("id", {ascending: true});

	if (error) {
		console.error("Error searching by WorkTitle:", error.message);
		return [];
	}
	console.log(data);
	console.log(title);
	return data || [];
}
