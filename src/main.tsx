import React from "react";
import ReactDOM from "react-dom/client";
import ThemedApp from "./ThemedApp.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { AxiosError } from "axios";
import { HOUR, NET_ERR_KEY } from "./entities/constants.ts";


const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: (error) => {
        if (!(error instanceof AxiosError)) return;
        if (error.response?.status === 401) return;
        if (error.code && error.code === "ERR_NETWORK") {
          queryClient.setQueryData(NET_ERR_KEY, () => true);
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
        if (error.response?.status === 401) return false;
        if (error.code && error.code === "ERR_NETWORK") {
          queryClient.setQueryData(NET_ERR_KEY, () => true);
        }
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
