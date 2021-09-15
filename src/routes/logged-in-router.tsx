import React from "react";
import { isLoggedInVar } from "../apollo";
import { gql, useQuery } from "@apollo/client";
import { meQuery } from "../__generated__/meQuery";

const ME_QUERY = gql`
  query meQuery {
    me {
      id
      email
      role
      verified
    }
  }
`;
const LoggedInRouter = () => {
  const { data, loading, error } = useQuery<meQuery>(ME_QUERY);
  if (loading || error || !data) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-widest">Loading...</span>
      </div>
    );
  }
  return (
    <div>
      <h1>{data.me.role}</h1>
    </div>
  );
};
export default LoggedInRouter;
