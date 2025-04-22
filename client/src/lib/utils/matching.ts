type MatchScore = {
  userId: number;
  totalScore: number;
  skillsMatch: string[];
  resourcesMatch: string[];
  valuesMatch: string[];
};

/**
 * Calculate a matching score between two users based on complementary skills,
 * resources, and shared values.
 * 
 * @param userSkills - Skills of the current user
 * @param userResources - Resources of the current user
 * @param userValues - Values of the current user
 * @param otherUserId - ID of the user to match with
 * @param otherSkills - Skills of the other user
 * @param otherResources - Resources of the other user
 * @param otherValues - Values of the other user
 * @returns A match score object
 */
export const calculateMatchScore = (
  userSkills: string[],
  userResources: string[],
  userValues: string[],
  otherUserId: number,
  otherSkills: string[],
  otherResources: string[],
  otherValues: string[]
): MatchScore => {
  const userSkillsSet = new Set(userSkills);
  const userResourcesSet = new Set(userResources);
  const userValuesSet = new Set(userValues);
  
  const otherSkillsSet = new Set(otherSkills);
  const otherResourcesSet = new Set(otherResources);
  const otherValuesSet = new Set(otherValues);
  
  // Find complementary skills - skills that the other user has but current user doesn't
  const complementarySkills = otherSkills.filter(skill => !userSkillsSet.has(skill));
  
  // Find complementary resources - resources that the other user has but current user doesn't
  const complementaryResources = otherResources.filter(resource => !userResourcesSet.has(resource));
  
  // Find shared values - values that both users have
  const sharedValues = userValues.filter(value => otherValuesSet.has(value));
  
  // Calculate match score with weighted components
  // We prioritize complementary resources (3x) then skills (2x) and then shared values (1.5x)
  const skillsScore = complementarySkills.length * 2;
  const resourcesScore = complementaryResources.length * 3;
  const valuesScore = sharedValues.length * 1.5;
  
  const totalScore = skillsScore + resourcesScore + valuesScore;
  
  return {
    userId: otherUserId,
    totalScore,
    skillsMatch: complementarySkills,
    resourcesMatch: complementaryResources,
    valuesMatch: sharedValues
  };
};

/**
 * Sort matches by total score in descending order
 * 
 * @param matches - Array of match scores to sort
 * @returns Sorted array of match scores
 */
export const sortMatchesByScore = (matches: MatchScore[]): MatchScore[] => {
  return [...matches].sort((a, b) => b.totalScore - a.totalScore);
};

/**
 * Filter matches based on minimum score threshold
 * 
 * @param matches - Array of match scores to filter
 * @param minScore - Minimum score threshold (default: 5)
 * @returns Filtered array of match scores
 */
export const filterMatchesByMinScore = (
  matches: MatchScore[],
  minScore: number = 5
): MatchScore[] => {
  return matches.filter(match => match.totalScore >= minScore);
};

/**
 * Calculate a matching percentage based on the score
 * 
 * @param score - The match score
 * @param maxPossibleScore - The maximum possible score (default: 30)
 * @returns Match percentage (0-100)
 */
export const calculateMatchPercentage = (
  score: number,
  maxPossibleScore: number = 30
): number => {
  const percentage = Math.round((score / maxPossibleScore) * 100);
  // Cap at 100% and ensure it's at least 0%
  return Math.min(100, Math.max(0, percentage));
};
