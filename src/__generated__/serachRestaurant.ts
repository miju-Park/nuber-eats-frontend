/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchRestaurantInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: serachRestaurant
// ====================================================

export interface serachRestaurant_searchRestaurant_restaurants_category {
  __typename: "Category";
  name: string;
}

export interface serachRestaurant_searchRestaurant_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImg: string;
  category: serachRestaurant_searchRestaurant_restaurants_category | null;
  address: string | null;
  isPromoted: boolean;
}

export interface serachRestaurant_searchRestaurant {
  __typename: "SearchRestaurantOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  restaurants: serachRestaurant_searchRestaurant_restaurants[] | null;
}

export interface serachRestaurant {
  searchRestaurant: serachRestaurant_searchRestaurant;
}

export interface serachRestaurantVariables {
  input: SearchRestaurantInput;
}
