"use-client";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuthStore from "lib/store/useAuthStore";
import { pb } from "lib/database/pocketbase";
import { useState } from "react";
import PrivatePage from "@/components/PageWrapper/PrivatePage";
import { UsersRolesOptions } from "types/pocketbase-types";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const { data, isLoading, getUser } = useAuthStore();

  if (pb.authStore.isValid && !data && !isLoading) {
    getUser();
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Grachelle&apos;s CRM</title>
        <meta name="description" content="Grachelles Blend" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/grachelles.png" />
      </Head>
      <PrivatePage allowedRoles={[UsersRolesOptions.admin]}>
        <main>
          <Component {...pageProps} />
        </main>
      </PrivatePage>
      <ToastContainer />
    </QueryClientProvider>
  );
}
