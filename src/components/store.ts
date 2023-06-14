import { writable } from 'svelte/store';

const currentWeek = () => Math.ceil((new Date().getTime() - new Date(new Date().getFullYear(), 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000));

export const readingPlanSelected = writable("F260_NewTestament");
export const weekNumberSelected = writable(currentWeek());
export const selectedFontSyleForBibleText = writable("font-sans");
export const themeColor = writable("blue")