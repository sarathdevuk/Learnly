import React from "react";
import { Route, Routes } from "react-router-dom";
import TutorDashboard from "../Pages/Tutor/TutorDashboard";
import TutorLoginPage from "../Pages/Tutor/TutorLoginPage";
import ChangePasswordPage from "../Pages/Tutor/ChangePasswordPage";
import PrivateRoutes from "../utils/PrivateRoutes";
import ErrorPage from "../Componants/ErrorPage/ErrorPage";
import AddCouresePage from "../Pages/Tutor/AddCouresePage";
import ViewCoursePage from "../Pages/Tutor/ViewCoursePage";
import EditCoursePage from "../Pages/Tutor/EditCoursePage";
import ViewQuestionsPage from "../Pages/Tutor/ViewQuestionsPage";
import ReplayQuestionPage from "../Pages/Tutor/ReplayQuestionPage";

function TutorRouter() {
  return (
    <Routes>
      <Route element={<PrivateRoutes role={"tutor"} route={"/tutor"} />}>
        <Route path="/dashboard" element={<TutorDashboard />} />
        <Route path="/add-course" element={<AddCouresePage />} />
        <Route path="/edit-course/:courseId"  element={<EditCoursePage />} />{" "}
        <Route path="/course" element={<ViewCoursePage />} />
        <Route path="/questions" element={<ViewQuestionsPage />} />
        <Route path="/questions/replay/:courseId" element={<ReplayQuestionPage />} />
        <Route path="/change-password" element={<ChangePasswordPage />} /> 
      </Route>
      <Route path="/*" element={<ErrorPage />} />
      <Route path="/" element={<TutorLoginPage />} />
    </Routes>
  );
}

export default TutorRouter;
