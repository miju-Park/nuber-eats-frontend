import { useLazyQuery } from "@apollo/client";
import gql from "graphql-tag";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useHistory, useLocation } from "react-router";
import { RESTAURANT_FRAGMENT } from "../../fragment";
import {
  serachRestaurant,
  serachRestaurantVariables,
} from "../../__generated__/serachRestaurant";
const SEARCH_RESTAURANT = gql`
  query serachRestaurant($input: SearchRestaurantInput!) {
    searchRestaurant(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

export const Search = () => {
  const location = useLocation();
  const history = useHistory();
  const [queryReadyToFetch, { loading, data }] = useLazyQuery<
    serachRestaurant,
    serachRestaurantVariables
  >(SEARCH_RESTAURANT);
  useEffect(() => {
    const [_, query] = location.search.split("?term=");
    if (!query) {
      return history.replace("/");
    }
    queryReadyToFetch({
      variables: {
        input: {
          page: 1,
          query,
        },
      },
    });
  }, [history, location, queryReadyToFetch]);
  return (
    <h1>
      <Helmet>
        <title>Search | Nuber Eats</title>
      </Helmet>
      Search page
    </h1>
  );
};
