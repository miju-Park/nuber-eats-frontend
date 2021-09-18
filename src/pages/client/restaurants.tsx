import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import {
  restaurantsQuery,
  restaurantsQueryVariables,
} from "../../__generated__/restaurantsQuery";
import React from "react";

const RESTAURANTS_QUERY = gql`
  query restaurantsQuery($input: RestaurantsInput!) {
    allCategories {
      ok
      error
      categories {
        id
        name
        coverImg
        slug
        restaurantCount
      }
    }
    restaurants(input: $input) {
      ok
      error
      totalPages
      totalResults
      results {
        id
        name
        coverImg
        category {
          name
        }
        address
        isPromoted
      }
    }
  }
`;
export const Restaurants = () => {
  const { data, loading } = useQuery<
    restaurantsQuery,
    restaurantsQueryVariables
  >(RESTAURANTS_QUERY, {
    variables: {
      input: {
        page: 1,
      },
    },
  });
  return (
    <div>
      <form className="bg-gray-800 w-full py-40 flex items-center justify-center">
        <input
          className="input rounded-md border-0 w-3/12"
          type="Search"
          placeholder="Search Restaurants..."
        />
      </form>
      {!loading && (
        <div className="max-w-screen-2xl mx-auto mt-8">
          <div className="flex justify-around max-w-lg mx-auto">
            {data?.allCategories?.categories?.map((category) => (
              <div className="flex flex-col group cursor-pointer items-center">
                <div
                  className="w-16 h-16 bg-cover group-hover:bg-gray-100 rounded-full"
                  style={{ backgroundImage: `url(${category.coverImg})` }}
                />
                <span className="mt-1 text-sm text-center font-bold">
                  {category.name}
                </span>
              </div>
            ))}
          </div>
          <div className="grid mt-10 grid-cols-3 gap-x-5 gap-y-7">
            {data?.restaurants.results?.map((restaurant) => (
              <div key={restaurant.id}>
                <div
                  style={{ backgroundImage: `url(${restaurant.coverImg})` }}
                  className="bg-red-500 bg-cover bg-center mb-3 gap-11 py-28"
                ></div>
                <h3 className="text-xl font-medium">{restaurant.name}</h3>
                <span className="border-t-2 border-gray-200">
                  {restaurant.category?.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      <div></div>
    </div>
  );
};

export default Restaurants;
