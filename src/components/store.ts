import { writable } from "svelte/store";

let currentDate: Date = new Date();
let startDate: Date = new Date(currentDate.getFullYear(), 0, 1);
let days: number = Math.floor((currentDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000));

let weekNumber: number = Math.ceil(days / 7);

console.log(">>> Actual week number: ", weekNumber);

export const readingPlanSelected = writable("F260_NewTestament");

const meetingDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const getStoredWeekNumber = () => {
  const storedWeekNumber = localStorage.getItem("weekNumber");
  return storedWeekNumber ? parseInt(storedWeekNumber, 10) : currentWeek();
};

const currentWeek = () => {
  const firstDayOfYear = new Date(new Date().getFullYear(), 0, 1);
  const currentDate = new Date();
  const currentMeetingDay = meetingDays[currentDate.getDay()];
  const meetingDayIndex = meetingDays.indexOf(currentMeetingDay);
  const daysFromFirstDay = (meetingDayIndex - firstDayOfYear.getDay() + 8) % 7;
  return Math.ceil((daysFromFirstDay + 1) / 7);
};

const initialWeekNumber = getStoredWeekNumber();
export const weekNumberSelected = writable(initialWeekNumber);

weekNumberSelected.subscribe((value) => {
  localStorage.setItem("weekNumber", value.toString());
  console.log(">>> Selected week number:", value);
});

const savedMeetingDay = localStorage.getItem("meetingDay") || "Sunday";
export const meetingDay = writable(savedMeetingDay);

meetingDay.subscribe((value) => {
  localStorage.setItem("meetingDay", value);
  console.log(">>> Meeting Day: ", value);
});

export const selectedFontStyleForBibleText = writable("Serif");

const getStoredThemeColor = () => {
  const storedColor = localStorage.getItem("themeColor");
  return storedColor || "blue";
};

const initialThemeColor = getStoredThemeColor();
export const themeColor = writable(initialThemeColor);

themeColor.subscribe((value) => {
  localStorage.setItem("themeColor", value.toString());
});

// ==================================================
const currentAppVersionNumber = "1.0";

const storedVersionNumber = localStorage.getItem("versionNumber") || currentAppVersionNumber;

// Get the stored dismissal status from localStorage or use false as the initial value
const initialBannerDismissed = localStorage.getItem("bannerDismissed") === "true" && storedVersionNumber === currentAppVersionNumber;

export const bannerDismissed = writable(initialBannerDismissed);

bannerDismissed.subscribe($bannerDismissed => {
  console.log('Banner Dismissed:', $bannerDismissed);
});

// Check if the stored version number is different from the initial version number
if (storedVersionNumber !== currentAppVersionNumber) {
  bannerDismissed.set(false); // Reset the banner dismissal status to false for new updates
  localStorage.setItem("bannerDismissed", "false"); // Update the stored dismissal status in localStorage
  localStorage.setItem("versionNumber", currentAppVersionNumber); // Update the stored version number in localStorage
}