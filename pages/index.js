import React, { useState } from "react";
import { EmptyState, Layout, Navigation, Page, Stack } from "@shopify/polaris";
import { ResourcePicker } from "@shopify/app-bridge-react";
import store from "store-js";
import ProductList from "../components/ProductList";

const Index = () => {
  const [modal, setModal] = useState({ open: false });
  const emptyState = !store.get("ids");
  const handleSelection = (resources) => {
    const resourceIds = resources.selection.map((product) => product.id);
    setModal({ open: false });
    store.set("ids", resourceIds);
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

      {emptyState ? (
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
      ) : (
        <ProductList emptyState={emptyState} />
      )}
    </Page>
  );
};

export default Index;
