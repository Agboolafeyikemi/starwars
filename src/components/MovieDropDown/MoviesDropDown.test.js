import React from "react";
import MovieDropDown from "./index";
import { render, screen, fireEvent, userEvent } from "@testing-library/react";

test("should display the correct number of options", () => {
  render(
    <MovieDropDown
      data={[
        { release_date: "2022-01-2", title: "Feyikemi" },
        { release_date: "2012-01-2", title: "Queen is Good" },
        { release_date: "2025-01-2", title: "GOd is Good" },
        { release_date: "2023-01-2", title: "Halleluyah" },
      ]}
    />
  );
  expect(screen.getAllByRole("option").length).toBe(5);
});
