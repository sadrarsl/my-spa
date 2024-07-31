import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ThemeProvider from "./contexts/ThemeContext";
import AuthProvider from "./contexts/AuthContext";
import TableProvider from "./contexts/TableContext";
import { BrowserRouter as Router } from "react-router-dom";
import "./i18n";

import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
  MutationCache,
} from "@tanstack/react-query";

/**
 * Initializes a QueryClient with custom configurations.
 *
 * @returns {QueryClient} Configured QueryClient instance
 */
const initializeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: false,
        retry: 2,
        refetchOnMount: false, // Whether to refetch on mount
      },
      mutations: {
        retry: 1,
      },
    },
    queryCache: new QueryCache({
      onError: (error, query) => {
        console.error(`Query error: ${query.queryKey}`, error);
      },
    }),
    mutationCache: new MutationCache({
      onError: (error) => {
        console.error(`Mutation error`, error);
      },
    }),
  });
};

// Initialize the QueryClient
const queryClient = initializeQueryClient();

/**
 * Renders the React application to the DOM.
 */
const renderApp = () => {
  ReactDOM.render(
    <QueryClientProvider client={queryClient}>
      <React.StrictMode>
        <ThemeProvider>
          <AuthProvider>
            <TableProvider>
              <Router>
          
                  <App />
              </Router>
            </TableProvider>
          </AuthProvider>
        </ThemeProvider>
      </React.StrictMode>
    </QueryClientProvider>,
    document.getElementById("root")
  );
};

// Render the application
renderApp();
