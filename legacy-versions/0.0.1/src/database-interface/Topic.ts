export default interface Topic {
  topic: string;
  last_message?: string;
  last_message_sent_at: string;
  created_at: string;
  updated_at?: string;
}
