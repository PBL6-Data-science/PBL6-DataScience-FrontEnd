"use client";

import SalesOverview from "@/pages/Home/SalesOverview";
import PageContainer from "@/customize/components/container/PageContainer";
import Layout from "@/customize/Layout/Layout";

const HomePage = () => {
  return (
    <>
      <Layout>
        <PageContainer title="Dashboard" description="this is Dashboard">
          <SalesOverview />
          {/* <Blog /> */}
        </PageContainer>
      </Layout>
    </>
  );
};
export default HomePage;
