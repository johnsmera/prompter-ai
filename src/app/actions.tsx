"use server";

import { createMessageUsecase } from "@/@core/application/usecases/message/instances/message-instances";
import type { AnswerQuestionUsecaseInput } from "@/@core/application/usecases/question/AnswerQuestion.usecase";
import { answerQuestionUsecase } from "@/@core/application/usecases/question/instances/question-instances";
import { serializeToJSON } from "@/utils/serializeToJSON";

export const sendMessageAction = async (message: string) => {
	// Send message to the server
	const sendMessage = await createMessageUsecase.execute({
		userId: "8bda4522-e339-4e0d-83cf-bc9d3d7cbc38",
		userMessage: message,
	});

	return serializeToJSON(sendMessage);
};

export const answerQuestionAction = async (
	input: AnswerQuestionUsecaseInput,
) => {
	const answerQuestion = await answerQuestionUsecase.execute(input);

	console.log({ answerQuestion });

	return serializeToJSON(answerQuestion);
};
