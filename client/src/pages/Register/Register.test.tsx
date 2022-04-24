import { render, screen } from "@testing-library/react";
import Register from "./index";
import { Provider } from "react-redux";
import store from "../../store";
import { BrowserRouter } from "react-router-dom";

test("renders register text", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Register />
      </Provider>
    </BrowserRouter>
  );
  const text = screen.getByText(/Register to use the APP/i);
  expect(text).toBeInTheDocument();
});

describe("renders inputs properly", () => {
  test("renders first name input", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Register />
        </Provider>
      </BrowserRouter>
    );
    const emailLabel = screen.getByLabelText("Enter your first name");
    const input = screen.getByPlaceholderText("First Name");
    expect(emailLabel).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  test("renders last name input", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Register />
        </Provider>
      </BrowserRouter>
    );
    const emailLabel = screen.getByLabelText("Enter your last name");
    const input = screen.getByPlaceholderText("Last Name");
    expect(emailLabel).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  test("renders email input", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Register />
        </Provider>
      </BrowserRouter>
    );
    const emailLabel = screen.getByLabelText("Enter your email");
    const input = screen.getByPlaceholderText("Email");
    expect(emailLabel).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  test("renders password input", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Register />
        </Provider>
      </BrowserRouter>
    );
    const emailLabel = screen.getByLabelText("Enter your password");
    const input = screen.getByPlaceholderText("Password");
    expect(emailLabel).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  test("Register button is rendered and it's disabled", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Register />
        </Provider>
      </BrowserRouter>
    );
    const loginButton = screen.getByText("Register").closest("button");
    expect(loginButton).toHaveAttribute("disabled");
  });
});
