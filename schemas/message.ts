export type Message = {
  id: string;
  name: string;
  sender: "myself" | "other";
  content: string;
  type: "text" | "image" | "audio";
  profile_picture?: string;
}