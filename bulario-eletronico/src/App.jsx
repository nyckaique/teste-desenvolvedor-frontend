import React from "react";
import RoutesApp from "./routes";
import { BrowserRouter } from "react-router-dom";
import ApiProvider from "./Context/api";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <ApiProvider>
        <ToastContainer
          autoClose={3000}
          theme="colored"
          position="top-center"
        />
        <RoutesApp />
      </ApiProvider>
    </BrowserRouter>
  );
}

export default App;
