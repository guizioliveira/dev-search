export function formatter(info: string | null) {
  return info === null ? "Not informed" : info;
}

export function dateFormatter(date: string) {
  const convertedDate = new Date(date);
  const formatedDate = convertedDate.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  return formatedDate;
}

export function shortenHash(hash: string) {
  return hash.substring(0, 7);
}
