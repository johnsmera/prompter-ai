import type { FilterMessagesDTO } from "@/@core/adapters/dtos/message/message.dtos";
import type { MessageRepository } from "../../repositories/message/message.repository";
import type { Message } from "@/@core/domain/models/messages/messages.model";

export class ListMessagesUsecase {
	constructor(private readonly messageRepository: MessageRepository) {}

	async execute(input: FilterMessagesDTO): Promise<Message[]> {
		return this.messageRepository.list(input);
	}
}
