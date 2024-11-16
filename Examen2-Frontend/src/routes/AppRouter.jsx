import { Route, Routes } from "react-router-dom";
import { PrincipalRouter } from "../features/content/routes";
import { SecurityRouter } from "../features/security/routes/SecurityRouter";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/*" element={<PrincipalRouter />} />
      <Route path="/security/*" element={<SecurityRouter />} />
    </Routes>
  );
};
