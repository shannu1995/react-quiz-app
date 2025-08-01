export type RootStackParamList = {
  Home: undefined;
  Continent: undefined;
  ResultsScreen: { matches: { [key: string]: string }, correctAnswers: { [key: string]: string }};
  QuizScreen: { difficulty?: string; continent?: string };
  "All Current Data": undefined;
};
