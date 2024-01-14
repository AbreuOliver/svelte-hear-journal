import { writable } from "svelte/store";

// HELPER FUNCTIONS
const currentWeek = () => {
  const firstDayOfYear = new Date(new Date().getFullYear(), 0, 1);
  const currentDate = new Date();
  const currentMeetingDay = meetingDays[currentDate.getDay()];
  const meetingDayIndex = meetingDays.indexOf(currentMeetingDay);
  const daysFromFirstDay = (meetingDayIndex - firstDayOfYear.getDay() + 8) % 7;
  return Math.ceil((daysFromFirstDay + 1) / 7);
};

const getStoredWeekNumber = () => {
  const storedWeekNumber = localStorage.getItem("weekNumber");
  return storedWeekNumber ? parseInt(storedWeekNumber, 10) : currentWeek();
};

const getStoredThemeColor = () => {
  const storedColor = localStorage.getItem("themeColor");
  return storedColor || "blue";
};

const getStoredReadingPlan = () => {
  const storedReadingPlan = localStorage.getItem("readingPlanSelected");
  return storedReadingPlan || "F260_NewTestament";
};

/* -------------------------------------------------------------------------- */
// INITIAL VALUES:
const meetingDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const currentAppVersionNumber = "1.2";
const initialReadingPlan = getStoredReadingPlan();
const initialWeekNumber = getStoredWeekNumber();
const initialMeetingDay = localStorage.getItem("meetingDay") || "Sunday";
const initialThemeColor = getStoredThemeColor();
const storedVersionNumber = localStorage.getItem("versionNumber") || currentAppVersionNumber;
const initialBannerDismissed = localStorage.getItem("bannerDismissed") === "true" && storedVersionNumber === currentAppVersionNumber;
/* -------------------------------------------------------------------------- */
// WRITABLE STORES
export const weekNumberSelected = writable(initialWeekNumber);
export const meetingDay = writable(initialMeetingDay);
export const themeColor = writable(initialThemeColor);
export const bannerDismissed = writable(initialBannerDismissed);
export const readingPlanSelected = writable(initialReadingPlan);
export const selectedFontStyleForBibleText = writable("Serif");
/* -------------------------------------------------------------------------- */
// SUBSCRIPTIONS:
// Subscribe to the weekNumberSelected store to update the local storage
weekNumberSelected.subscribe((value) => {
  localStorage.setItem("weekNumber", value.toString());
  console.log(">>> Selected week number:", value);
});

// Subscribe to the meetingDay store to update the local storage
meetingDay.subscribe((value) => {
  localStorage.setItem("meetingDay", value);
  console.log(">>> Meeting Day: ", value);
});

// Subscribe to the themeColor store to update the local storage
themeColor.subscribe((value) => {
  localStorage.setItem("themeColor", value.toString());
});

readingPlanSelected.subscribe((value) => {
  localStorage.setItem("readingPlanSelected", value);
});


// BANNER LOGIC:
// Check if the stored version number is different from the initial version number
if (storedVersionNumber !== currentAppVersionNumber) {
  bannerDismissed.set(false); // Reset the banner dismissal status to false for new updates
  localStorage.setItem("bannerDismissed", "false"); // Update the stored dismissal status in localStorage
  localStorage.setItem("versionNumber", currentAppVersionNumber); // Update the stored version number in localStorage
}
/* -------------------------------------------------------------------------- */