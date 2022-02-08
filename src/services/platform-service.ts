import { CodingProblem } from './../models/index';
import axios from 'axios';

// axios.interceptors.request.use(
//     async (config) => {
//       config.baseURL = import.meta.env.VITE_ASSETS_API_URL;
//       config.headers = {
//         Accept: 'application/json',
//         'Content-Type': 'application/x-www-form-urlencoded'
//       };
//       return config;
//     },
//     (error) => {
//       Promise.reject(error);
//     }
// );

export const PlatformService = {
  async getCodingProblem(): Promise<CodingProblem> {
    return {
      question: 'Create a function that reverses an array.',
      duration: 5,
      testCases: [{
        input: [2,4,5,7],
        output: [7,5,4,2]
      },
      {
        input: ['a','e','i'],
        output: ['i','e','a']
      }]
    };
  }
}