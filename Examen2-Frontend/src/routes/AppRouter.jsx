import { Route, Routes } from "react-router-dom";
import { PrincipalRouter } from "../features/content/routes";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="*" element={<PrincipalRouter />} />
    </Routes>
  );
};
