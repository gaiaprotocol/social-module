import Message from "../database-interface/Message.js";

export default class MessageService<T extends Message> {
  constructor(private tableName: string) {}
}
