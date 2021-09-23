import React from "react";
import {Button} from "../button";
import { getByText, render } from "@testing-library/react";
describe("<Button />", () => {
  it("should render OK with props", () => {
    const { debug, getByText , container} = render(<Button canClick={true} loading={false} actionText={"test"} />);
    getByText('test')
  })
  it('should display loading', ()=>{
    const { debug, getByText, container } = render(<Button canClick={true} loading={true} actionText={"test"} />);
    getByText('Loading...')
    expect(container.firstChild).toHaveClass("pointer-events-none");
  });
});
