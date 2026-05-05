export function getMinDeadlineDate(): Date {
  const minHours = 3;
  return new Date(Date.now() + minHours * 60 * 60 * 1000);
}

export function getFlatpickrDateConfig() {
  return {
    minDate: getMinDeadlineDate(),
    dateFormat: "Y-m-d",
    disableMobile: true,
  };
}

export function getFlatpickrTimeConfig() {
  return {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    time_24hr: false,
    defaultDate: "23:59",
  };
}

export function formatDeadlineDisplay(isoString: string | null): string {
  if (!isoString) return "Not set";
  const date = new Date(isoString);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}
