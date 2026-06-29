import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SearchPage } from "@/features/search/page";
import { ProfileDetailPage } from "@/features/profile/page";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/profile/:username" element={<ProfileDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
