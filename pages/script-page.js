import React from "react";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { Button } from "@shopify/polaris";

const CREATE_SCRIPT_TAG = gql`
  mutation scriptTagCreate($input: ScriptTagInput!) {
    scriptTagCreate(input: $input) {
      scriptTag {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`;
const QUERY_SCRIPT_TAGS = gql`
  {
    scriptTags(first: 1) {
      edges {
        node {
          id
          src
          displayScope
        }
      }
    }
  }
`;

const DELETE_SCRIPTTAG = gql`
  mutation scriptTagDelete($id: ID!) {
    scriptTagDelete(id: $id) {
      deletedScriptTagId
      userErrors {
        field
        message
      }
    }
  }
`;

const ScriptPage = () => {
  return (
    <div>
      <h1>this is script page</h1>
      {/* <Query
        query={QUERY_SCRIPT_TAGS}
        variables={{
          variables: {
            input: {
              src: "https://8da11950ba05.ngrok.io/test-script.js",
              displayScope: "ALL",
            },
          },
        }}
      >
        {({ data, loading, error }) => {
          if (loading) {
            return <Button loading={true}></Button>;
          }
          if (error) {
            return <div>{error.message}</div>;
          }
          console.log(data);
          return <div>{data.id}</div>;
        }}
      </Query> */}
      <Button
        type="submit"
        onClick={() => {
          // <Mutation
          //   mutation={CREATE_SCRIPT_TAG}
          //   variables={{
          //     variables: {
          //       input: {
          //         src: "https://8da11950ba05.ngrok.io/test-script.js",
          //         displayScope: "ALL",
          //       },
          //     },
          //   }}
          // />;
          console.log("script completed");
        }}
      >
        Create Script Tag
      </Button>
      {/* {data.scriptTags.edges.map((item) => {
        return (
          <div key={item.node.id}>
            <p>{item.node.id}</p>
          </div>
        );
      })} */}
    </div>
  );
};

export default ScriptPage;
