type CandidateProfile = any;
type User = any;

export type ProfileCompletionStats = {
  percentage: number;
  missingFields: string[];
};

export function calculateProfileCompletion(
  user: User,
  profile: CandidateProfile | null
): ProfileCompletionStats {
  const fields = [
    { name: "Name", isComplete: !!user.name },
    { name: "Headline", isComplete: !!profile?.headline },
    { name: "Location", isComplete: !!profile?.location },
    { name: "Phone", isComplete: !!user.phone },
    { name: "Summary", isComplete: !!profile?.summary },
    { name: "Skills", isComplete: Array.isArray(profile?.skills) && profile!.skills.length > 0 },
    { name: "Experience", isComplete: Array.isArray(profile?.experience) && profile!.experience.length > 0 },
    { name: "Education", isComplete: Array.isArray(profile?.education) && profile!.education.length > 0 },
  ];

  const totalFields = fields.length;
  const completedFields = fields.filter((f) => f.isComplete).length;
  const missingFields = fields.filter((f) => !f.isComplete).map((f) => f.name);

  const percentage = Math.round((completedFields / totalFields) * 100);

  return { percentage, missingFields };
}
