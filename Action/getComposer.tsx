import { supabase } from "@/utils/supabaseClient";

export async function getComposer(): Promise<string[]> {
  const famousComposersList = [
    "Beethoven",
    "bach",
    "Mozart",
    "Schubert",
    "Brahms",
    "Debussy",
    "Tchaikovsky",
    "Rachmaninoff",
    "Haydn",
    "Chopin",
    "Mahler",
    "Mendelssohn",
    "Shostakovich",
    "Handel",
    "Schumann",
  ];

  const { data, error } = await supabase
    .from("ClassicalDictionary")
    .select("Composer");
  if (error) {
    console.error("Error retrieving composers:", error.message);
    return [];
  }

  const filteredComposers = data
    .map((item) => item.Composer)
    .filter((composer) =>
      famousComposersList.some((famousComposer) =>
        composer.includes(famousComposer),
      ),
    );
  const composerSet = new Set(data.map((item) => item.Composer));
  return Array.from(composerSet);
}
