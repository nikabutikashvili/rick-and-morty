import { render, screen } from "@testing-library/react";
import Home from "./index";
import { Provider } from "react-redux";
import store from "../../store";
import { BrowserRouter } from "react-router-dom";

test("renders home page heading", () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Home />
      </Provider>
    </BrowserRouter>
  );
  const text = screen.getByText(/The Rick And Morty Characters/i);
  expect(text).toBeInTheDocument();
});
