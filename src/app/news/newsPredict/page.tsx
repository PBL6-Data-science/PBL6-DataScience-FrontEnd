"use client";

import Layout from "@/customize/Layout/Layout";
import PageContainer from "@/customize/components/container/PageContainer";
import NewsPredictPage from "@/pages/News/NewsPredict";

const NewsPredict = () => {
  return (
    <PageContainer title="News List" description="This is News List">
      <Layout>
        <NewsPredictPage />;
      </Layout>
    </PageContainer>
  );
};

export default NewsPredict;
