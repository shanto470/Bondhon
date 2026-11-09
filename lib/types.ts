export interface EventItem {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string; // YYYY-MM-DD
  email: string;
  organizer?: string;
  participants: number;
  createdAt: string;
}

export type EventInput = Pick<
  EventItem,
  "title" | "description" | "eventType" | "thumbnail" | "location" | "eventDate"
>;
