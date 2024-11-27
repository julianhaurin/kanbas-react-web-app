
import axios from "axios";

export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const USERS_API = `${REMOTE_SERVER}/api/users`;

const axiosWithCredentials = axios.create({ withCredentials: true });

export const signin = async (credentials: any) => {
  const response = await axiosWithCredentials.post( `${USERS_API}/signin`, credentials );
  return response.data;
};

export const signup = async (user: any) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
  return response.data;
};

export const updateUser = async (user: any) => {
  const response = await axiosWithCredentials.put(`${USERS_API}/${user._id}`, user);
  return response.data;
};

export const getCurrentUserData = async () => {
  const response = await axiosWithCredentials.get(`${USERS_API}/current/data`);
  return response.data;
};

export const profile = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
  return response.data;
};

export const signout = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
  return response.data;
};

export const findMyCourses = async () => {
  const { data } = await axiosWithCredentials.get(`${USERS_API}/current/courses`);
  return data;
};

export const findMyRole = async () => {
  const { data } = await axiosWithCredentials.get(`${USERS_API}/current/role`);
  console.log("got role data: " + JSON.stringify(data))
  return data;
}

export const findMyRoleWithID = async ( uid : string ) => {
  const { data } = await axiosWithCredentials.get(`${USERS_API}/${uid}/role`);
  console.log("got role with id data: " + JSON.stringify(data))
  return data;
}

export const findMyID = async () => {
  const { data } = await axiosWithCredentials.get(`${USERS_API}/current/id`);
  console.log("got user id: " + data)
  return data;
}

export const createCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.post(`${USERS_API}/current/courses`, course);
  return data;
};





