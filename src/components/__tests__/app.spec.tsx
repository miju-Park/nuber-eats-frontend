import { render } from "@testing-library/react";
import { waitFor } from "@testing-library/react";
import { debug } from "console";
import React from "react";
import { isLoggedInVar } from "../../apollo";
import { App } from "../app";

jest.mock("../../routes/logged-out-router", () => {
  return {
    LoggedOutRouter: () => <span>logged-out</span>,
  };
});

jest.mock("../../routes/logged-in-router", () => {
  return {
    LoggedInRouter: () => <span>logged-in</span>,
  };
});

describe("<App />", () => {
  it("renders LoggedOutRouter", () => {
    const { debug, getByText } = render(<App />);
    debug();
    getByText("logged-out");
  });
  it("renders LoggedIntRouter", async () => {
    const { debug, getByText } = render(<App />);
    await waitFor(() => {
      isLoggedInVar(true);
    });
    debug();
    getByText("logged-in");
  });
});
