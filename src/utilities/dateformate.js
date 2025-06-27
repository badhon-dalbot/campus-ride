function formatDateLabel(dateString) {
  const inputDate = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  // Reset times for accurate date comparison
  inputDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  tomorrow.setHours(0, 0, 0, 0);

  if (inputDate.getTime() === today.getTime()) {
    return "Today";
  } else if (inputDate.getTime() === tomorrow.getTime()) {
    return "Tomorrow";
  } else {
    // return formatted date, e.g. 'Jun 29, 2025'
    return inputDate.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
}

export { formatDateLabel };
