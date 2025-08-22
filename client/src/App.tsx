import { BrowserRouter, Route, Routes } from "react-router";
import AddBin from "./pages/AddBin";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Signup from "./pages/Signup";

import { BinFinderProvider } from "./context/BinFinderProvider"; // import provider

function App() {
  return (
    <BinFinderProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<Search />} />
          <Route path="/add-bin" element={<AddBin />} />
          {/* Add other routes as needed */}
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </BinFinderProvider>
  );
}

export default App;
