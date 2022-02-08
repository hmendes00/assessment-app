export interface User {
  id?: number;
  name?: string;
  type?: string;
  avatarUrl?: string;
}

export interface TestCase {
  input: any;
  output: any;
}

export interface CodingProblem {
  question: string;
  testCases?: TestCase[];
  /** duration in minutes */
  duration: number;
}
