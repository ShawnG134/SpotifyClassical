function enhancedLevenshtein(a: string, b: string): number {
	const lenA = a.length;
	const lenB = b.length;
	const dp = Array.from({ length: lenA + 1 }, () => Array(lenB + 1).fill(0));

	for (let i = 1; i <= lenA; i++) {
		dp[i][0] = i;
	}

	for (let j = 1; j <= lenB; j++) {
		dp[0][j] = j;
	}

	for (let i = 1; i <= lenA; i++) {
		for (let j = 1; j <= lenB; j++) {
			if (a[i - 1] === b[j - 1]) {
				dp[i][j] = dp[i - 1][j - 1];
			} else {
				const isNumA = /\d/.test(a[i - 1]);
				const isNumB = /\d/.test(b[j - 1]);
				const substitutionCost = (isNumA || isNumB) ? 10 : 5; // Higher cost for number substitution
				const deletionCost = isNumA ? 10 : 1; // Higher cost for deleting a number
				const insertionCost = isNumB ? 10 : 1; // Higher cost for inserting a number

				dp[i][j] = Math.min(
					dp[i - 1][j] + deletionCost, // Deletion
					dp[i][j - 1] + insertionCost, // Insertion
					dp[i - 1][j - 1] + substitutionCost // Substitution
				);
			}
		}
	}

	return dp[lenA][lenB];
}

export function calculateSimilarity(a: string, b: string): number {
	const levDistance = enhancedLevenshtein(a, b);
	const normalizedLevDistance = levDistance / Math.max(a.length, b.length);

	const keywordsA = a.toLowerCase().split(/[^a-z0-9]+/).filter(word => word.length > 1);
	const keywordsB = b.toLowerCase().split(/[^a-z0-9]+/).filter(word => word.length > 1);

	const commonKeywords = keywordsA.filter(word => keywordsB.includes(word));
	const keywordMatchScore = commonKeywords.length / Math.min(keywordsA.length, keywordsB.length);

	return (1 - normalizedLevDistance) * 0.7 + keywordMatchScore * 0.3;
}
