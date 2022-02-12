export interface User {
  id?: number;
  name?: string;
  type?: string;
  avatarUrl?: string;
}

export interface CustomTestCase {
  input: any;
  output: any;
}

export interface CodingProblem {
  question: string;
  testCases: CustomTestCase[];
  /** duration in minutes */
  duration: number;
  exampleFunction: string;
  functionToRunWhenTesting: string;
}
