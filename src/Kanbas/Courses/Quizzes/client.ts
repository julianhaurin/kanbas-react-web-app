
import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;

// GET REQUESTS //

export const fetchAllQuizzes = async () => {
  const { data } = await axiosWithCredentials.get(QUIZZES_API);
  return data;
};

export const fetchQuizzesForCourse = async (id: string) => {
  const { data } = await axiosWithCredentials.get(`${QUIZZES_API}/course/${id}`);
  return data;
};

export const fetchQuizByID = async (id: string) => {
  const { data } = await axiosWithCredentials.get(`${QUIZZES_API}/${id}`);
  // console.log("QC: GOT QUIZ DATA: " + JSON.stringify(data))
  return data;
};

// PUT REQUESTS // 

export const updateQuiz = async (id : string, quiz: any) => {
  const { data } = await axiosWithCredentials.put(`${QUIZZES_API}/${id}`, quiz);
  return data;
};

// POST REQUESTS //

export const createQuiz = async (quiz: any) => {
  const { data } = await axiosWithCredentials.post(QUIZZES_API, quiz);
  return data;
};

// DELETE REQUESTS //

export const deleteQuiz = async (id: string) => {
  const { data } = await axiosWithCredentials.delete(`${QUIZZES_API}/${id}`);
  return data;
};


