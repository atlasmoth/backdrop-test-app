import React from "react";

import Home, { CatCard } from "../components/Home";
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import catsForTesting from "../utils/catsForTesting";

beforeEach(() => {
  fetch.resetMocks();
});

test("Test Home component with existing data", async () => {
  const setFavorites = jest.fn();
  const setCats = jest.fn();

  const favorites = [...catsForTesting];
  const cats = [...catsForTesting];
  render(
    <Home
      favorites={favorites}
      setFavorites={setFavorites}
      setCats={setCats}
      cats={cats}
    />
  );
  await waitFor(() => screen.getByText("Arabian Mau"));
  const element = screen.getByText("Arabian Mau");

  expect(element).toBeTruthy();

  fireEvent.press(screen.getAllByTestId("home-cat-button")[0]);
  expect(setFavorites).toHaveBeenCalled();
});

test("Test Home component without existing data", async () => {
  fetch.mockResponseOnce(JSON.stringify(catsForTesting));
  const setFavorites = jest.fn();

  const favorites = [...catsForTesting];
  const cats = [];
  const setCats = jest.fn();
  render(
    <Home
      favorites={favorites}
      setFavorites={setFavorites}
      setCats={setCats}
      cats={cats}
    />
  );

  await waitFor(() => screen.getByTestId("home-flatlist"));
  const element = screen.getByTestId("home-flatlist");

  expect(element).toBeTruthy();

  expect(setCats).toHaveBeenCalled();
});

test("Test CatCard component", async () => {
  const setFavorites = jest.fn();
  const favorites = [catsForTesting[0]];
  render(
    <CatCard
      setFavorites={setFavorites}
      {...catsForTesting[0]}
      favorites={favorites}
    />
  );
  const element = screen.getByText("Arabian Mau");

  expect(element).toBeTruthy();

  fireEvent.press(screen.getByTestId("home-cat-button"));
  expect(setFavorites).toHaveBeenCalled();
});
