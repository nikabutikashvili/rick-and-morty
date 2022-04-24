import { render, screen } from "@testing-library/react";
import Login from "./index";
import { Provider } from "react-redux";
import store from "../../store";
import { BrowserRouter } from "react-router-dom";

test("renders login text", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Login />
      </Provider>
    </BrowserRouter>
  );
  const text = screen.getByText(/Please login in order to see characters/i);
  expect(text).toBeInTheDocument();
});

test("renders logo", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Login />
      </Provider>
    </BrowserRouter>
  );
  const logoElement = screen.getByAltText("logo");
  expect(logoElement).toBeInTheDocument();
});

describe("renders inputs properly", () => {
  test("renders email input", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </BrowserRouter>
    );
    const emailLabel = screen.getByLabelText("Enter your email");
    const input = screen.getByPlaceholderText("email");
    expect(emailLabel).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  test("renders password input", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </BrowserRouter>
    );
    const emailLabel = screen.getByLabelText("Enter your password");
    const input = screen.getByPlaceholderText("password");
    expect(emailLabel).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  test("Login button is rendered and it's disabled", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </BrowserRouter>
    );
    const loginButton = screen.getByText("Login").closest("button");
    expect(loginButton).toHaveAttribute("disabled");
  });

  test("Register button is rendered", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </BrowserRouter>
    );
    const loginButton = screen.getByText("Register").closest("button");
    expect(loginButton).toBeInTheDocument();
  });
});
