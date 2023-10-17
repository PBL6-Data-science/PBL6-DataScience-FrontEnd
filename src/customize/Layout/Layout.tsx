import type { Metadata } from "next";

import { useState } from "react";
import { styled, Box } from "@mui/material";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import NetworkErrorBoundary from "@/app/error";
import RouteGuard from "./Shared/RouteGuard";

export const metadata: Metadata = {
  title: "DUT-Blog aaaa",
  description: "DUT Blog App",
};

const MainWrapper = styled(Box)(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled(Box)(() => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "20px",
  flexDirection: "column",
  width: "100%",
  maxWidth: "100%",
  zIndex: 1,
  backgroundColor: "transparent",
  overflowX: "hidden",
}));
const ContentWrapper = styled(Box)(() => ({
  flexGrow: 1,
  borderRadius: "16px",
  width: "99%",
  maxWidth: "100%",
  margin: "8px auto",
}));

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  

  return (
    <NetworkErrorBoundary>
      <RouteGuard>
        <MainWrapper className="mainwrapper">
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            isMobileSidebarOpen={isMobileSidebarOpen}
            onSidebarClose={() => setMobileSidebarOpen(false)}
          />
          <PageWrapper className="page-wrapper">
            <Header toggleMobileSidebar={() => setMobileSidebarOpen(true)} />
            <ContentWrapper>
              {/* ------------------------------------------- */}
              {/* Page Route */}
              {/* ------------------------------------------- */}
              <Box sx={{ padding: "1px", minHeight: "calc(100vh - 170px)" }}>
                {children}
              </Box>
              {/* ------------------------------------------- */}
              {/* End Page */}
              {/* ------------------------------------------- */}
            </ContentWrapper>
            <Footer />
          </PageWrapper>
        </MainWrapper>
      </RouteGuard>
    </NetworkErrorBoundary>
  );
}
