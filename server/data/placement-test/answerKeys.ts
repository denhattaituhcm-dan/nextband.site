/**
 * Authoritative Secret Answer Keys for ARIS Entrance Assessment
 * Strictly resides on Backend Server.
 * NEVER EXPORTED OR EXPOSED TO CLIENT BUNDLE.
 */

export interface AuthoritativeAnswerKey {
  questionId: string;
  skill: "listening" | "reading" | "grammar";
  correctAnswer: string; // Exact match or regex/variants separated by '|'
  acceptedAnswers?: string[];
  diagnosticCategory: string;
  difficulty: "foundation" | "intermediate" | "advanced";
  weight: number;
}

export const authoritativePlacementAnswerKeys: Record<string, AuthoritativeAnswerKey> = {
  // Listening: Multi-blank fill-in-the-blank (10 blanks)
  "43907def-1f78-4839-8751-ff1079fdee91": {
    questionId: "43907def-1f78-4839-8751-ff1079fdee91",
    skill: "listening",
    correctAnswer: '["choose","private","20% | 20 percent","healthy","bones","lecture","Arretsa | arretsa","vegetarian","market","knife"]',
    acceptedAnswers: ["choose", "private", "20%", "20 percent", "healthy", "bones", "lecture", "Arretsa", "arretsa", "vegetarian", "market", "knife"],
    diagnosticCategory: "cambridge_listening_form_filling",
    difficulty: "intermediate",
    weight: 10,
  },

  // Reading: Multi-blank fill-in-the-blank (7 blanks)
  "c0d8e9bd-f426-42c3-b051-4c15df13543a": {
    questionId: "c0d8e9bd-f426-42c3-b051-4c15df13543a",
    skill: "reading",
    correctAnswer: '["update","environment","captain","films","season","accomodation","blog"]',
    acceptedAnswers: ["update", "environment", "captain", "films", "season", "accomodation", "accommodation", "blog"],
    diagnosticCategory: "summary_completion",
    difficulty: "intermediate",
    weight: 7,
  },

  // Reading: True / False / Not Given (6 questions)
  "e6084ef6-30d7-421b-9935-c15e506d4049": {
    questionId: "e6084ef6-30d7-421b-9935-c15e506d4049",
    skill: "reading",
    correctAnswer: "FALSE",
    acceptedAnswers: ["FALSE", "F"],
    diagnosticCategory: "tfng_logic",
    difficulty: "intermediate",
    weight: 1,
  },
  "de50e60b-f74c-4948-905f-03f5ba2c0b6d": {
    questionId: "de50e60b-f74c-4948-905f-03f5ba2c0b6d",
    skill: "reading",
    correctAnswer: "NOT GIVEN",
    acceptedAnswers: ["NOT GIVEN", "NG"],
    diagnosticCategory: "tfng_logic",
    difficulty: "advanced",
    weight: 1,
  },
  "e19ac399-6094-4a0c-9003-b54abc5e0f40": {
    questionId: "e19ac399-6094-4a0c-9003-b54abc5e0f40",
    skill: "reading",
    correctAnswer: "FALSE",
    acceptedAnswers: ["FALSE", "F"],
    diagnosticCategory: "tfng_logic",
    difficulty: "intermediate",
    weight: 1,
  },
  "00d76f65-dd5f-4dc1-98de-8c235f37f834": {
    questionId: "00d76f65-dd5f-4dc1-98de-8c235f37f834",
    skill: "reading",
    correctAnswer: "TRUE",
    acceptedAnswers: ["TRUE", "T"],
    diagnosticCategory: "tfng_logic",
    difficulty: "intermediate",
    weight: 1,
  },
  "578ed22b-adee-4442-92ab-c04a1951d902": {
    questionId: "578ed22b-adee-4442-92ab-c04a1951d902",
    skill: "reading",
    correctAnswer: "NOT GIVEN",
    acceptedAnswers: ["NOT GIVEN", "NG"],
    diagnosticCategory: "tfng_logic",
    difficulty: "advanced",
    weight: 1,
  },
  "6268c893-6886-499e-81c3-194dea9cd9f2": {
    questionId: "6268c893-6886-499e-81c3-194dea9cd9f2",
    skill: "reading",
    correctAnswer: "TRUE",
    acceptedAnswers: ["TRUE", "T"],
    diagnosticCategory: "tfng_logic",
    difficulty: "intermediate",
    weight: 1,
  },

  // Grammar (10 questions)
  "7b3cc213-6fbc-4e41-8ed7-9420773fd55a": {
    questionId: "7b3cc213-6fbc-4e41-8ed7-9420773fd55a",
    skill: "grammar",
    correctAnswer: "goes",
    acceptedAnswers: ["goes"],
    diagnosticCategory: "present_simple_tense",
    difficulty: "foundation",
    weight: 1,
  },
  "5ba28972-e776-4953-b05e-41d6a862c4ed": {
    questionId: "5ba28972-e776-4953-b05e-41d6a862c4ed",
    skill: "grammar",
    correctAnswer: "have read",
    acceptedAnswers: ["have read"],
    diagnosticCategory: "present_perfect_tense",
    difficulty: "foundation",
    weight: 1,
  },
  "afd8852d-5f56-413d-99ef-73cd89c969d4": {
    questionId: "afd8852d-5f56-413d-99ef-73cd89c969d4",
    skill: "grammar",
    correctAnswer: "will be sent",
    acceptedAnswers: ["will be sent"],
    diagnosticCategory: "future_passive_voice",
    difficulty: "intermediate",
    weight: 1,
  },
  "59739e98-711b-4d4b-8927-e5f97c0d3a32": {
    questionId: "59739e98-711b-4d4b-8927-e5f97c0d3a32",
    skill: "grammar",
    correctAnswer: "much",
    acceptedAnswers: ["much"],
    diagnosticCategory: "uncountable_quantifiers",
    difficulty: "foundation",
    weight: 1,
  },
  "380a1c22-1b82-478a-863e-e5e9a2ac21dd": {
    questionId: "380a1c22-1b82-478a-863e-e5e9a2ac21dd",
    skill: "grammar",
    correctAnswer: "since",
    acceptedAnswers: ["since"],
    diagnosticCategory: "prepositions_of_time",
    difficulty: "foundation",
    weight: 1,
  },
  "36a7ce11-694e-4986-871b-96427ac6f798": {
    questionId: "36a7ce11-694e-4986-871b-96427ac6f798",
    skill: "grammar",
    correctAnswer: "invested",
    acceptedAnswers: ["invested"],
    diagnosticCategory: "second_conditional",
    difficulty: "intermediate",
    weight: 1,
  },
  "307abd86-198d-4686-9c35-03e3b8d84520": {
    questionId: "307abd86-198d-4686-9c35-03e3b8d84520",
    skill: "grammar",
    correctAnswer: "who",
    acceptedAnswers: ["who"],
    diagnosticCategory: "relative_pronouns",
    difficulty: "foundation",
    weight: 1,
  },
  "af2cb913-45db-4ee3-a2bb-870d79d44334": {
    questionId: "af2cb913-45db-4ee3-a2bb-870d79d44334",
    skill: "grammar",
    correctAnswer: "to maintain",
    acceptedAnswers: ["to maintain"],
    diagnosticCategory: "infinitive_structures",
    difficulty: "intermediate",
    weight: 1,
  },
  "ecd26e7b-aaae-45a1-b3c2-52bcdd8409af": {
    questionId: "ecd26e7b-aaae-45a1-b3c2-52bcdd8409af",
    skill: "grammar",
    correctAnswer: "having",
    acceptedAnswers: ["having"],
    diagnosticCategory: "gerund_after_prepositions",
    difficulty: "intermediate",
    weight: 1,
  },
  "eea6e4cd-4eda-4de6-904c-c4c2a834f0a7": {
    questionId: "eea6e4cd-4eda-4de6-904c-c4c2a834f0a7",
    skill: "grammar",
    correctAnswer: "had already finished",
    acceptedAnswers: ["had already finished"],
    diagnosticCategory: "past_perfect_tense",
    difficulty: "intermediate",
    weight: 1,
  },
};
