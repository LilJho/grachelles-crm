import dayjs from "dayjs";

export const generateDateTimeRange = (timeFilter: {
  start: string;
  end: string;
}) => {
  const currentDateTime = dayjs(); // get the current date and time using dayjs
  const { start, end } = timeFilter;

  // Convert start and end times to 24-hour format
  const [startHour, startMinute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);

  // If the end time is before the start time, add one day to the end time
  let endDateTime = currentDateTime
    .set("hour", endHour)
    .set("minute", endMinute);
  if (
    endDateTime.isBefore(
      currentDateTime.set("hour", startHour).set("minute", startMinute)
    )
  ) {
    endDateTime = endDateTime.add(1, "day");
  } else if (endHour < 2) {
    endDateTime = endDateTime.add(1, "day");
  }

  // Format start and end dates as strings in the desired format
  const startDate = currentDateTime
    .set("hour", startHour)
    .set("minute", startMinute)
    .format("YYYY-MM-DD hh:mm A");
  const endDate = endDateTime
    .set("hour", endHour)
    .set("minute", endMinute)
    .format("YYYY-MM-DD hh:mm A");

  return { startDate, endDate };
};
