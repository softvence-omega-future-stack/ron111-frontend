"use client";

import "./globals.css";
import MainLayout from "../components/layouts/MainLayout";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <ProtectedRoute>
            <MainLayout>
            {children}
          </MainLayout>
          </ProtectedRoute>
        </Provider>
      </body>
    </html>
  );
}
