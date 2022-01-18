const TOKEN_API_URL = 'https://opentdb.com/api_token.php?command=request';
const QUESTIONS_API_BASE_URL = 'https://opentdb.com/api.php?amount=5&token=';
const CATEGORIES_API_URL = 'https://opentdb.com/api_category.php';

const composeWithOptions = (base, token, { category, difficulty, type }) => {
  let url = base + token;
  if (category) url += `&category=${category}`;
  if (difficulty) url += `&difficulty=${difficulty}`;
  if (type) url += `&type=${type}`;
  return url;
};

export const getUserToken = () => fetch(TOKEN_API_URL)
  .then((response) => response.json())
  .then((data) => data.token);

export const getQuestions = (token, options = {}) => fetch(composeWithOptions(
  QUESTIONS_API_BASE_URL,
  token,
  options,
))
  .then((response) => response.json());

export const getCategories = () => fetch(CATEGORIES_API_URL)
  .then((response) => response.json())
  .then((data) => data.trivia_categories);
