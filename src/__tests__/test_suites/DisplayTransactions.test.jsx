
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../../components/App";

//mock transaction data returned by API
const mockData = [
  {
    id: 1,
    date: "2024-01-01",
    description: "Coffee",
    category: "Food",
    amount: 5,
  },
];

//moch the global fetch function before each test
beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockData),
    })
  );
});

describe("Display Transactions", () => {
  it("shows transactions on startup", async () => {
    //render the main application component
    render(<App />);

    //verify that the transaction data appears in the UI
    const coffee = await screen.findByText("Coffee");
    const food = await screen.findByText("Food");
    const amount = await screen.findByText("5");

    expect(coffee).toBeDefined();
    expect(food).toBeDefined();
    expect(amount).toBeDefined();
  });
});
