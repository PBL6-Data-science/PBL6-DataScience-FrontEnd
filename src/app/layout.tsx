"use client";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Head from "next/head";
import { baselightTheme } from "@/ultils/theme/DefaultColors";

export default function RootLayout({
  children,
  pageTitle,
}: {
  children: React.ReactNode;
  pageTitle: string;
}) {
  return (
    <html lang="en">
      <body cz-shortcut-listen="true">
        <ThemeProvider theme={baselightTheme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Head>
            <title>{pageTitle}</title>
          </Head>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
