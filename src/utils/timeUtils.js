export const formatTime24Hour = (dateTime) => {
  if (!dateTime) return;
  const datetimeStr = dateTime;
  const date = new Date(datetimeStr);

  // Get hours, minutes, and seconds formatted with leading zeros
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
};

export const getHours = (dateTime) => {
  if (!dateTime) return;
  const datetimeStr = dateTime;
  const date = new Date(datetimeStr);
  const hours = date.getHours();

  return hours;
};
