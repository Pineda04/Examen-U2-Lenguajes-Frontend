import { Navigate, Route, Routes } from "react-router-dom";
import { AccountsPage, HomePage, JournalsPage } from "../pages";

export const PrincipalRouter = () => {
  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen">
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/accounts" element={<AccountsPage />} />
        <Route path="/journals" element={<JournalsPage />} />
        <Route path="/*" element={<Navigate to={"/home"} />} />
      </Routes>
    </div>
  );
};
