import { Landing } from "./pages/Landing";
import { Dashboard } from "./pages/Dashboard";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TestimonialGlobal } from "./pages/TestimonialGlobal";
import { Author } from "./pages/Author";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/global/testimonial/:companyName"
            element={<TestimonialGlobal />}
          />
          <Route path="/author" element={<Author />} />
          <Route path="/notfound" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
