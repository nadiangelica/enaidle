import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { expect } from "@jest/globals";
import "@testing-library/jest-dom/extend-expect";
import OrgsLoginForm from "./OrgsLoginForm";

describe("OrgsLoginForm", () => {
  it("renders the form", () => {
    const { getByRole } = render(<OrgsLoginForm />);
    const form = getByRole("heading", { name: /LOGIN/i });
    expect(form).toBeInTheDocument();
  });

  it("renders a button", () => {
    const { getAllByText } = render(<OrgsLoginForm />);
    const buttonElements = getAllByText("LOGIN");
    const loginButton = buttonElements[1]; // The second element is the submit button
    expect(loginButton).toBeInTheDocument();
  });


});
