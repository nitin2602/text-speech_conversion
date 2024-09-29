import React from "react";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Playground from "./pages/Playground";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/text-speech-playground" element={<Playground />} />
        </Routes>
      </main>

      {/* Footer component will be shown on all pages */}
      <Footer />
    </div>
  );
};

export default App;
