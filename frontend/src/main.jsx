import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { DarkModeContextProvider } from "./Contexts/DarkModeContext.jsx";
import { UserContextProvider } from "./Contexts/UserContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <UserContextProvider>
        <QueryClientProvider client={queryClient}>
          <App />
          {/* <ReactQueryDevtools /> */}
        </QueryClientProvider>
      </UserContextProvider>
    </DarkModeContextProvider>
  </React.StrictMode>
);
