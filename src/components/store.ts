import { writable } from "svelte/store";


export const readingPlanSelected = writable("F260_NewTestament");

// Function to retrieve the stored week number from local storage (or use a default value)
const getStoredWeekNumber = () => {
  const storedWeekNumber = localStorage.getItem("weekNumber");
  return storedWeekNumber ? parseInt(storedWeekNumber, 10) : currentWeek();
};

// Function to calculate the current week number
const currentWeek = () =>
  Math.ceil(
    (new Date().getTime() -
      new Date(new Date().getFullYear(), 0, 1).getTime()) /
      (7 * 24 * 60 * 60 * 1000)
  );

// Retrieve the week number from local storage (or use a default value)
const initialWeekNumber = getStoredWeekNumber();

// Create the writable Svelte store for the week number
export const weekNumberSelected = writable(initialWeekNumber);

// Update the stored week number in local storage whenever it changes
weekNumberSelected.subscribe((value) => {
  localStorage.setItem("weekNumber", value.toString());
});

export const selectedFontStyleForBibleText = writable("Serif");



// Function to retrieve the stored theme color from local storage (or use a default value if no theme color is found)
const getStoredThemeColor = () => {
  const storedColor = localStorage.getItem("themeColor");
  return storedColor ? storedColor : "blue"; 
};

const initialThemeColor = getStoredThemeColor();

// Create the writable Svelte store for the theme color
export const themeColor = writable(initialThemeColor);

// Update the stored theme color in local storage whenever it changes
themeColor.subscribe((value) => {
  localStorage.setItem("themeColor", value);
});
