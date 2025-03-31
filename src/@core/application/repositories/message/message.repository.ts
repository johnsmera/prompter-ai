import type {
	CreateMessageDTO,
	FilterMessagesDTO,
} from "@/@core/adapters/dtos/message/message.dtos";
import type { Message } from "@/@core/domain/models/messages/messages.model";

export interface MessageRepository {
	create: (message: CreateMessageDTO) => Promise<Message>;
	list: (filters: FilterMessagesDTO) => Promise<Message[]>;
	update: (message: Message) => Promise<Message>;
	findById: (id: string) => Promise<Message>;
}
