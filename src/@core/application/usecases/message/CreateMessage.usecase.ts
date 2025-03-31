import { Message } from "@/@core/domain/models/messages/messages.model";
import type { IAIProvider } from "@/@core/application/providers/IAIProvider";
import type { MessageRepository } from "../../repositories/message/message.repository";

export interface CreateMessageUsecaseInput {
	userId: string;
	userMessage: string;
}

export class CreateMessageUsecase {
	constructor(
		private readonly messageRepository: MessageRepository,
		private readonly aiProvider: IAIProvider,
	) {}

	async execute(input: CreateMessageUsecaseInput): Promise<Message> {
		const aiResponse = await this.aiProvider.generateResponse(
			Message.messageToPrompt(input.userMessage),
		);

		return this.messageRepository.create({
			responseMessage: aiResponse,
			userId: input.userId,
			userMessage: input.userMessage,
		});
	}
}
