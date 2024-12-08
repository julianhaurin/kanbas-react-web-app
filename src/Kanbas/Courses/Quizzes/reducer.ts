

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzes: [],
};
const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    addQuiz: (state, { payload: quiz }) => {
      const newQuiz: any = {
        name: quiz.name,
        course: quiz.course,
      };
      state.quizzes = [...state.quizzes, newQuiz] as any;
    },
    deleteQuiz: (state, { payload: moduleId }) => {
      state.quizzes = state.quizzes.filter(
        (m: any) => m._id !== moduleId);
    },
    updateQuiz: (state, { payload: module }) => {
      state.quizzes = state.quizzes.map((m: any) =>
        m._id === module._id ? module : m
      ) as any;
    },
    editQuiz: (state, { payload: moduleId }) => {
      state.quizzes = state.quizzes.map((m: any) =>
        m._id === moduleId ? { ...m, editing: true } : m
      ) as any;
    },
  },
});
export const { addQuiz, deleteQuiz, updateQuiz, editQuiz, setQuizzes } =
quizzesSlice.actions;
export default quizzesSlice.reducer;

