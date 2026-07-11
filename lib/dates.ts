import { format } from "date-fns";

export function formatPostDate(date: string) {
  return format(new Date(date), "MM/dd/yy");
}

export function formatPostDateLong(date: string) {
  return format(new Date(date), "EEEE, MMMM d, yyyy");
}

export function formatRssDate(date: string) {
  return new Date(date).toUTCString();
}
