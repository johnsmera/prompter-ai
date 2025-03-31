import { Message } from "./messages.model";

export class MessagesList {
	messages: Message[];

	constructor(startMessages: Message[]) {
		this.messages = startMessages;
	}

	addMessage(message: Message) {
		this.messages.push(message);
	}

	getLatestMessage(): Message {
		return this.messages[this.messages.length - 1];
	}

	updateMessage(message: Message) {
		const index = this.messages.findIndex(
			(msg) => msg.messageId === message.messageId,
		);

		if (index === -1) return;
		// Preserve the order by updating the message in place
		this.messages[index] = new Message(message);
	}

	updateLastMessage(message: Message) {
		console.log({
			updatingMessage: message,
		});
		if (this.messages.length === 0) return;
		// Update the last message in place to preserve order
		const lastMessage = this.messages[this.messages.length - 1];
		lastMessage.updateResponse(
			message.responseMessage,
			message.userResponseMessage,
			message.userResponseScore,
		);
	}
}
