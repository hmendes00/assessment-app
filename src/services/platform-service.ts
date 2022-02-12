import { CodingProblem } from './../models/index';

export const PlatformService = {
  async getCodingProblem(): Promise<CodingProblem> {
    return {
      question: 'Create a function that reverses an array.',
      exampleFunction: `function test() {\n  //your function goes here\n}`,
      duration: 5,
      testCases: [
        {
          input: [2, 4, 5, 7],
          output: [7, 5, 4, 2]
        },
        {
          input: ['a', 'e', 'i'],
          output: ['i', 'e', 'a']
        }
      ],
      functionToRunWhenTesting: 'test'
    };
  }
};
