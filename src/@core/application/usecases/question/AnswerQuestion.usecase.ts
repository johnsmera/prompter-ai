import { Message } from "@/@core/domain/models/messages/messages.model";
import type { IAIProvider } from "@/@core/application/providers/IAIProvider";
import type { MessageRepository } from "../../repositories/message/message.repository";
import { Question } from "@/@core/domain/models/questions/question.model";

export interface AnswerQuestionUsecaseInput {
	question: string;
	answer: string;
	messageId: string;
}

export class AnswerQuestionUsecase {
	constructor(
		private readonly messageRepository: MessageRepository,
		private readonly aiProvider: IAIProvider,
	) {}

	async execute(input: AnswerQuestionUsecaseInput): Promise<Message> {
		const storageMessage = await this.messageRepository.findById(
			input.messageId,
		);

		const isCorrect = await this.aiProvider.generateResponse(
			Question.makeCheckAnswerIsCorrectPrompt({
				answer: input.answer,
				question: input.question,
			}),
		);

		const aiResponse = Number(isCorrect ? isCorrect : 0);

		const message = new Message({
			...storageMessage,
			generatedQuestion: input.question,
			userResponseMessage: input.answer,
			userResponseScore: aiResponse,
		});

		return this.messageRepository.update(message);
	}
}
