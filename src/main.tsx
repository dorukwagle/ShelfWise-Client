import React from "react";
import ReactDOM from "react-dom/client";
import ThemedApp from "./ThemedApp.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { HOUR, USER_CACHE_KEY } from "./entities/constants.ts";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";


const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: (error) => {
        if (!(error instanceof AxiosError)) return;
        if (error.response?.status === 401) {
          queryClient.setQueryData(USER_CACHE_KEY, () => ({}));
          // useShowLoginPage.getState().setShowLoginPage(true);
        }
      },
      retry: 1,
    },
    queries: {
      refetchOnWindowFocus: false,
      staleTime: HOUR,
      gcTime: HOUR,
      throwOnError: (error) => {
        if (!(error instanceof AxiosError)) return true;
        if (error.response?.status === 401)
          queryClient.setQueryData(USER_CACHE_KEY, () => ({}));
        return false;
      },
      retry: 2,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>  
        <ThemedApp />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
