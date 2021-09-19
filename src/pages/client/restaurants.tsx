import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import {
  restaurantsQuery,
  restaurantsQueryVariables,
} from "../../__generated__/restaurantsQuery";
import React, { useState } from "react";
import { Restaurant } from "../../components/restaurant";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { Helmet } from "react-helmet-async";
import { RESTAURANT_FRAGMENT } from "../../fragment";

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
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;
interface IFormProps {
  searchTerm: string;
}
export const Restaurants = () => {
  const [page, setPage] = useState(1);
  const { data, loading } = useQuery<
    restaurantsQuery,
    restaurantsQueryVariables
  >(RESTAURANTS_QUERY, {
    variables: {
      input: {
        page,
      },
    },
  });
  const onPrevPageClick = () => setPage((current) => current - 1);
  const onNextPageClick = () => setPage((current) => current + 1);
  const { register, handleSubmit, getValues } = useForm<IFormProps>();
  const history = useHistory();
  const onSearchSubmit = () => {
    const { searchTerm } = getValues();
    history.push({
      pathname: "/search",
      search: `?term=${searchTerm}`,
    });
  };
  return (
    <div>
      <Helmet>
        <title>Home | Nuber Eats</title>
      </Helmet>
      <form
        className="bg-gray-800 w-full py-40 flex items-center justify-center"
        onSubmit={handleSubmit(onSearchSubmit)}
      >
        <input
          {...register("searchTerm", { required: true, min: 3 })}
          name="searchTerm"
          className="input rounded-md border-0 w-3/4 md:w-3/12"
          type="Search"
          placeholder="Search Restaurants..."
        />
      </form>
      {!loading && (
        <div className="max-w-screen-2xl mx-auto mt-8">
          <div className="flex justify-around max-w-lg mx-auto">
            {data?.allCategories?.categories?.map((category) => (
              <div
                className="flex flex-col group cursor-pointer items-center"
                key={category.id}
              >
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
          <div className="grid mt-16 md:grid-cols-3 gap-x-5 gap-y-7">
            {data?.restaurants.results?.map((restaurant) => (
              <Restaurant
                id={`${restaurant.id}`}
                key={restaurant.id}
                coverImg={restaurant.coverImg}
                name={restaurant.name}
                categoryName={restaurant?.category?.name}
              />
            ))}
          </div>
          <div className="grid grid-cols-3 text-center max-w-md items-center mx-auto mt-10">
            {page > 1 ? (
              <button
                onClick={onPrevPageClick}
                className="focus:outline-none font-medium text-2xl"
              >
                &larr;
              </button>
            ) : (
              <div />
            )}
            <span className="mx-5">
              Page {page} of {data?.restaurants?.totalPages}
            </span>
            {page !== data?.restaurants.totalPages ? (
              <>
                <button
                  onClick={onNextPageClick}
                  className="focus:outline-none font-medium text-2xl"
                >
                  &rarr;
                </button>
              </>
            ) : (
              <div />
            )}
          </div>
        </div>
      )}
      <div></div>
    </div>
  );
};

export default Restaurants;
