export interface CreateMessageDTO {
	userId: string;
	userMessage: string;
	responseMessage: string;
  userResponseMessage?: string;
  userResponseScore?: number;
}

export interface FilterMessagesDTO {
	userId?: string;
	userMessage?: string;
	responseMessage?: string;
}
