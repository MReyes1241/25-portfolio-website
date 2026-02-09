// src/routes/TeachingRoutes.tsx
import { Route } from "react-router-dom";
import CourseHome from "../pages/teaching/CoursesHome.tsx";
import CSCI133Unit1 from "../pages/teaching/csci133_f25/unit1/CSCI133Unit1.tsx";
import CSCI133Unit2 from "../pages/teaching/csci133_f25/unit2/CSCI133Unit2.tsx";
import CSCI133Unit3 from "../pages/teaching/csci133_f25/unit3/CSCI133Unit3.tsx";
import CSCI133Unit4 from "../pages/teaching/csci133_f25/unit4/CSCI133Unit4.tsx";
import CSCI133Unit5 from "../pages/teaching/csci133_f25/unit5/CSCI133Unit5.tsx";
import CSCI133Unit6 from "../pages/teaching/csci133_f25/unit6/CSCI133Unit6.tsx";
import CSCI133Unit7 from "../pages/teaching/csci133_f25/unit7/Csci133unit7.tsx";
import CSCI133Unit8 from "../pages/teaching/csci133_f25/unit8/Csci133unit8.tsx";
import CSCI133Unit9 from "../pages/teaching/csci133_f25/unit9/Csci133unit9.tsx";
import CSCI133Unit10 from "../pages/teaching/csci133_f25/unit10/Csci133unit10.tsx";
import CSCI133Unit11 from "../pages/teaching/csci133_f25/unit11/Csci133unit11.tsx";
import CSCI133Unit1_s26 from "../pages/teaching/csci133_s26/unit1/CSCI133Unit1_s26.tsx";
import CSCI133Unit2_s26 from "../pages/teaching/csci133_s26/unit2/Csci133unit2_s26.tsx";
import CSCI133Unit3_s26 from "../pages/teaching/csci133_s26/unit3/Csci133unit3_s26.tsx";

export function TeachingRoutes() {
  return (
    <>
      <Route path="/teaching" element={<CourseHome />} />
      <Route path="/teaching/csci133/unit1" element={<CSCI133Unit1 />} />
      <Route path="/teaching/csci133/unit2" element={<CSCI133Unit2 />} />
      <Route path="/teaching/csci133/unit3" element={<CSCI133Unit3 />} />
      <Route path="/teaching/csci133/unit4" element={<CSCI133Unit4 />} />
      <Route path="/teaching/csci133/unit5" element={<CSCI133Unit5 />} />
      <Route path="/teaching/csci133/unit6" element={<CSCI133Unit6 />} />
      <Route path="/teaching/csci133/unit7" element={<CSCI133Unit7 />} />
      <Route path="/teaching/csci133/unit8" element={<CSCI133Unit8 />} />
      <Route path="/teaching/csci133/unit9" element={<CSCI133Unit9 />} />
      <Route path="/teaching/csci133/unit10" element={<CSCI133Unit10 />} />
      <Route path="/teaching/csci133/unit11" element={<CSCI133Unit11 />} />
      <Route path="/teaching/csci133_s26/unit1" element={<CSCI133Unit1_s26 />} />
      <Route path="/teaching/csci133_s26/unit2" element={<CSCI133Unit2_s26 />} />
      <Route path="/teaching/csci133_s26/unit3" element={<CSCI133Unit3_s26 />} />
    </>
  );
}