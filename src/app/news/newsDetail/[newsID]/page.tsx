"use client";

import Layout from "@/customize/Layout/Layout";
import PageContainer from "@/customize/components/container/PageContainer";
import NewsDetailPage from "@/pages/News/newsDetail";

const NewsEdit = () => {
  return (
    <PageContainer title="News List" description="This is News List">
      <Layout>
        <NewsDetailPage />;
      </Layout>
    </PageContainer>
  );
};

export default NewsEdit;
