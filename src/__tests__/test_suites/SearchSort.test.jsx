
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../../components/App";

//mock transaction date returned by the fetch resquest 
const mockData = [
  { id: 1, description: "Coffee", amount: 5 },
  { id: 2, description: "Rent", amount: 1000 },
];

//before each test mock the global fetch call
beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockData),
    })
  );
});

//test suit for search and sort functionality
describe("Search and Sort", () => {
  it("updates the search input when the user types", async () => {
    render(<App />);

    //await for mock date to load on screen 
    await screen.findByText("Coffee");

    const search = screen.getByPlaceholderText("Search your Recent Transactions");

    //simulate user typing
    fireEvent.change(search, { target: { value: "cof" } });

    //input value should update
    expect(search.value).toBe("cof");
  });

  it("changes the sort select value when option is selected", async () => {
    render(<App />);

    //await for initial data render 
    await screen.findByText("Coffee");

    const sortSelect = screen.getByRole("combobox");

    //simulate user selecting a different sort option 
    fireEvent.change(sortSelect, { target: { value: "category" } });

    //check that the value changed
    expect(sortSelect.value).toBe("category");
  });
});
