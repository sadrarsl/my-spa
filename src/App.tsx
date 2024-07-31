import React from "react";
import AppRoutes from "./routes";
import NavBar from "./components/NavBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <div>
      <NavBar />
      <AppRoutes />
    </div>
  );
};

export default App;
