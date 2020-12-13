import React, { useState } from "react";
import { EmptyState, Layout, Page } from "@shopify/polaris";
import { ResourcePicker } from "@shopify/app-bridge-react";
import store from "store-js";

const Index = () => {
  const [modal, setModal] = useState({ open: false });
  const emptyState = !store.get("ids");
  const handleSelection = (resources) => {
    const ids = resources.selection.map((product) => product.id);
    setModal({ open: false });
    store.set("ids", ids);
    console.log("this is product ids", store.get("ids"));
  };
  return (
    <Page>
      <ResourcePicker
        resourceType="Product"
        showVariants={false}
        open={modal.open}
        onCancel={() => {
          setModal({ open: false });
        }}
        onSelection={(resources) => handleSelection(resources)}
      />
      <Layout>
        <EmptyState
          heading="Create your featured products"
          action={{
            content: "Add Product",
            onAction: () => setModal({ open: true }),
          }}
          image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
        >
          <p>Add products to get started</p>
        </EmptyState>
      </Layout>
    </Page>
  );
};

export default Index;
