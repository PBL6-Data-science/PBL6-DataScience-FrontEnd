"use client";

import Layout from "@/customize/Layout/Layout";
import PageContainer from "@/customize/components/container/PageContainer";
import NewsList from "@/pages/News/NewsList";

const ListNews = () => {
  return (
    <PageContainer title="News List" description="This is News List">
      <Layout>
        <NewsList />;
      </Layout>
    </PageContainer>
  );
};

export default ListNews;
