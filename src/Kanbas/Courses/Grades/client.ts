
import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const GRADES_API = `${REMOTE_SERVER}/api/grades`;

// GET REQUESTS //

export const fetchQuizUserGrades = async (qid : string, uid : string,) => {
  const { data } = await axiosWithCredentials.get(`${GRADES_API}/quizzes/${qid}/${uid}`);
  return data;
};

export const existsQuizUserGrades = async (qid : string, uid : string,) => {
  const { data } = await axiosWithCredentials.get(`${GRADES_API}/quizzes/exists/${qid}/${uid}`);
  return data;
};


// PUT REQUESTS // 

export const updateQuizUserGrades = async (gid : string, grades: any) => {
  // const { data } = await axiosWithCredentials.put(`${GRADES_API}/quizzes/${qid}/${uid}`, grades);
  const { data } = await axiosWithCredentials.put(`${GRADES_API}/${gid}`, grades);
  return data;
};

// POST REQUESTS //

export const createGrade = async (grades: any) => {
  const { data } = await axiosWithCredentials.post(GRADES_API, grades);
  return data;
};

// DELETE REQUESTS //

export const deleteGrades = async (id: string) => {
  const { data } = await axiosWithCredentials.delete(`${GRADES_API}/${id}`);
  return data;
};