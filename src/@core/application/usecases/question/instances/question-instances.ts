import { prismaRepository } from "@/@core/adapters/repositories/message/instances/prisma-message-repository";
import { AnswerQuestionUsecase } from "../AnswerQuestion.usecase";
import { openAIProvider } from "@/@core/adapters/providers/AI/instances/openai-provider";

export const answerQuestionUsecase = new AnswerQuestionUsecase(
	prismaRepository,
	openAIProvider,
);
