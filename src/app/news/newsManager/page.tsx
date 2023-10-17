"use client";

import Layout from "@/customize/Layout/Layout";
import PageContainer from "@/customize/components/container/PageContainer";
import NewsManagerPage from "@/pages/News/NewsManager";

const NewsManager = () => {
  return (
    <PageContainer title="News List" description="This is News List">
      <Layout>
        <NewsManagerPage />
      </Layout>
    </PageContainer>
  );
};

export default NewsManager;
