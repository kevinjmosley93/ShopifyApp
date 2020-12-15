import gql from "graphql-tag";
import { Query } from "react-apollo";
import {
  Button,
  Card,
  Loading,
  PageActions,
  ResourceList,
  Spinner,
  Stack,
  TextStyle,
  Thumbnail,
} from "@shopify/polaris";
import store from "store-js";

const GET_PRODUCTS_BY_ID = gql`
  query getProducts($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Product {
        title
        handle
        descriptionHtml
        id
        images(first: 1) {
          edges {
            node {
              originalSrc
              altText
            }
          }
        }
        variants(first: 1) {
          edges {
            node {
              price
              id
            }
          }
        }
      }
    }
  }
`;

const ProductList = ({ emptyState }) => {
  return (
    <Query query={GET_PRODUCTS_BY_ID} variables={{ ids: store.get("ids") }}>
      {({ data, loading, error }) => {
        if (loading)
          return (
            <div>
              <Spinner
                accessibilityLabel="Spinner example"
                size="large"
                color="teal"
              />
            </div>
          );
        if (error) return <div>{error.message}</div>;
        console.log("this is product data", data);
        return (
          <>
            <Card>
              <ResourceList
                showHeader
                resourceName={{ singular: "Product", plural: "Products" }}
                items={data.nodes}
                renderItem={(item) => {
                  const media = (
                    <Thumbnail
                      source={
                        item.images.edges[0]
                          ? item.images.edges[0].node.originalSrc
                          : ""
                      }
                      alt={
                        item.images.edges[0] ? item.images.edges[0].altText : ""
                      }
                    />
                  );
                  const price = item.variants.edges[0].node.price;
                  return (
                    <ResourceList.Item
                      id={item.id}
                      media={media}
                      accessibilityLabel={`View details for ${item.title}`}
                    >
                      <Stack>
                        <Stack.Item fill>
                          <h3>
                            <TextStyle variation="strong">
                              {item.title}
                            </TextStyle>
                          </h3>
                        </Stack.Item>
                        <Stack.Item>
                          <p>${price}</p>
                        </Stack.Item>
                      </Stack>
                    </ResourceList.Item>
                  );
                }}
              />
            </Card>
            <Stack>
              <Stack.Item>
                <PageActions
                  primaryAction={{
                    content: "Preview Featured Items",
                    onAction: () => {
                      console.log("this is click", data);
                    },
                  }}
                />
              </Stack.Item>
            </Stack>
          </>
        );
      }}
    </Query>
  );
};

export default ProductList;
