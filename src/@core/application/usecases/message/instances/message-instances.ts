import { prismaRepository } from "@/@core/adapters/repositories/message/instances/prisma-message-repository";
import { CreateMessageUsecase } from "../CreateMessage.usecase";
import { ListMessagesUsecase } from "../ListMessages.usecase";
import { openAIProvider } from "@/@core/adapters/providers/AI/instances/openai-provider";

export const createMessageUsecase = new CreateMessageUsecase(
	prismaRepository,
	openAIProvider,
);

export const listMessagesUsecase = new ListMessagesUsecase(prismaRepository);
