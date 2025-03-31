import { Message } from "@/@core/domain/models/messages/messages.model";
import type { PrismaClient } from "@prisma/client";
import type {
	CreateMessageDTO,
	FilterMessagesDTO,
} from "../../dtos/message/message.dtos";
import type { MessageRepository } from "@/@core/application/repositories/message/message.repository";

function constructWhereClause<T extends object>(input: T): Partial<T> {
	const whereClause: Partial<T> = {};

	for (const key of Object.keys(input)) {
		const value = input[key as keyof T];
		if (value !== undefined) {
			whereClause[key as keyof T] = value;
		}
	}

	return whereClause;
}

export class PrismaMessageRepository implements MessageRepository {
	constructor(private readonly prisma: PrismaClient) {
		this.prisma = prisma;
	}

	async create(message: CreateMessageDTO) {
		const createdMessage = await this.prisma.message.create({
			data: {
				responseMessage: message.responseMessage,
				userId: message.userId,
				userMessage: message.userMessage,
			},
		});

		return new Message({
			createdAt: createdMessage.createdAt.toISOString(),
			responseMessage: createdMessage.responseMessage,
			userId: createdMessage.userId,
			userMessage: createdMessage.userMessage,
			generatedQuestion: createdMessage.generatedQuestion || "",
			userResponseMessage: createdMessage.userResponseMessage || "",
			messageId: createdMessage.id,
			userResponseScore: createdMessage.userResponseScore || 0,
		});
	}

	async update(message: Message) {
		const updatedMessage = await this.prisma.message.update({
			where: {
				id: message.messageId,
			},
			data: {
				responseMessage: message.responseMessage || "",
				userMessage: message.userMessage || "",
				generatedQuestion: message.generatedQuestion || "",
				userResponseMessage: message.userResponseMessage || "",
				userResponseScore: message.userResponseScore || 0,
			},
		});

		return new Message({
			createdAt: updatedMessage.createdAt.toISOString(),
			responseMessage: updatedMessage.responseMessage,
			userId: updatedMessage.userId,
			userMessage: updatedMessage.userMessage,
			generatedQuestion: updatedMessage.generatedQuestion || "",
			messageId: updatedMessage.id,
			userResponseMessage: updatedMessage.userResponseMessage || "",
			userResponseScore: updatedMessage.userResponseScore || 0,
		});
	}

	async list(input: FilterMessagesDTO) {
		const whereClause = constructWhereClause(input);

		const messages = await this.prisma.message.findMany({
			orderBy: {
				createdAt: "asc",
			},
			where: whereClause,
		});

		return messages.map(
			(message) =>
				new Message({
					createdAt: message.createdAt.toISOString(),
					responseMessage: message.responseMessage,
					userId: message.userId,
					userMessage: message.userMessage,
					messageId: message.id,
					userResponseMessage: message.userResponseMessage || "",
					userResponseScore: message.userResponseScore || 0,
					generatedQuestion: message.generatedQuestion || "",
				}),
		);
	}

	async findById(messageId: string) {
		const message = await this.prisma.message.findUnique({
			where: {
				id: messageId,
			},
		});

		if (!message) {
			throw new Error("Message not found");
		}

		return new Message({
			createdAt: message.createdAt.toISOString(),
			responseMessage: message.responseMessage,
			userId: message.userId,
			userMessage: message.userMessage,
			messageId: message.id,
			generatedQuestion: message.generatedQuestion || "",
			userResponseMessage: message.userResponseMessage || "",
			userResponseScore: message.userResponseScore || 0,
		});
	}
}
