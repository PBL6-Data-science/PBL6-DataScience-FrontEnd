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
        <script
          async
          src="https://cdn.tiny.cloud/1/x8y7l1yy43azqm3amxd7km9c9z9t8nsflmqs5vmtl096nz7e/tinymce/6/tinymce.min.js"
          referrerPolicy="origin"
        ></script>
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
