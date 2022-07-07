export function formatter(info: string | null) {
  return info === null ? "Not informed" : info;
}

export function dateFormatter(date: string) {
  const convertedDate = new Date(date);
  const formatedDate = convertedDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return formatedDate;
}
