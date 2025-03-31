import type { MessagesList } from "../models/messages/messages-list.model";

export class ChatScreenModel {
	constructor(private readonly messagesList: MessagesList) {}

	get showEmptySection() {
		return this.messagesList.messages.length === 0;
	}

	get showNewMessageForm() {
		if (!this.messagesList.getLatestMessage()) return false;

		const hasQuestion = this.messagesList.getLatestMessage().generatedQuestion;
		console.log({ latestMessageShowNew: this.messagesList.getLatestMessage() });

		if (hasQuestion) {
			return this.messagesList.getLatestMessage().hasUserResponse;
		}

		return true;
	}

	get showAnswerForm() {
		if (!this.messagesList.getLatestMessage()) {
			return false;
		}

		console.log({
			latestMessageShowAnswer: this.messagesList.getLatestMessage(),
		});

		const hasUserResponse =
			this.messagesList.getLatestMessage().hasUserResponse;

		console.log({ hasUserResponse });

		const hasQuestion = this.messagesList.getLatestMessage().generatedQuestion;

		console.log({ hasQuestion });

		return !hasUserResponse && hasQuestion;
	}
}
