import React from "react";

import Cats, { CatFlexCard } from "../components/Cats";
import { render, screen, fireEvent } from "@testing-library/react-native";
import catsForTesting from "../utils/catsForTesting";

test("Test Cats component if user has no favorite cats", async () => {
  const setFavorites = jest.fn();
  const navigation = { navigate: jest.fn() };
  const favorites = [];
  render(
    <Cats
      favorites={favorites}
      navigation={navigation}
      setFavorites={setFavorites}
    />
  );
  const element = screen.getByText("Please like a cat first");

  expect(element).toBeTruthy();

  fireEvent.press(screen.getByTestId("button"));
  expect(navigation.navigate).toHaveBeenCalledWith("Home");
});

test("Test Cats component if user has favorite cats", async () => {
  const setFavorites = jest.fn();
  const navigation = { navigate: jest.fn() };
  const favorites = [...catsForTesting];
  render(
    <Cats
      favorites={favorites}
      navigation={navigation}
      setFavorites={setFavorites}
    />
  );
  const element = screen.getByText("Arabian Mau");

  expect(element).toBeTruthy();

  fireEvent.press(screen.getAllByTestId("cat-button")[0]);
  expect(setFavorites).toHaveBeenCalled();
});

test("Test CatFlexCard component", async () => {
  const setFavorites = jest.fn();
  render(<CatFlexCard setFavorites={setFavorites} {...catsForTesting[0]} />);
  const element = screen.getByText("Arabian Mau");

  expect(element).toBeTruthy();

  fireEvent.press(screen.getByTestId("cat-button"));
  expect(setFavorites).toHaveBeenCalled();
});
