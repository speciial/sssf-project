import React from "react";
import { render } from "@testing-library/react";
import Copyright from "./components/Copyright";

test("renders learn react link", () => {
  const { getByText } = render(<Copyright />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
