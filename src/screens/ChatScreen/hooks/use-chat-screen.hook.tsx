import { answerQuestionAction, sendMessageAction } from "@/app/actions";
import { useRef, useState, useTransition } from "react";
import { MessagesList } from "@/@core/domain/models/messages/messages-list.model";
import { Message } from "@/@core/domain/models/messages/messages.model";
import { ChatScreenModel } from "@/@core/domain/ui/chat.model";

export const useChatScreen = (initialMessages: Message[]) => {
	const messagesListRef = useRef(
		new MessagesList(initialMessages.map((msg) => new Message(msg))),
	);

	const [messages, setMessages] = useState(messagesListRef.current.messages);
	const [showTrophy, setShowTrophy] = useState(false);

	const { showEmptySection, showNewMessageForm, showAnswerForm } =
		new ChatScreenModel(messagesListRef.current);

	const [isSendingMessage, sendMessageTransition] = useTransition();

	const handleSendMessage = async (message: string) => {
		sendMessageTransition(async () => {
			const newMessage = await sendMessageAction(message);
			messagesListRef.current.addMessage(new Message(newMessage));
			setMessages([...messagesListRef.current.messages]);
		});
	};

	const handleAnswerQuestion = async (answer: string) => {
		const lastMessage = messagesListRef.current.getLatestMessage();

		if (!lastMessage) return;

		const updatedAnswer = await answerQuestionAction({
			answer,
			messageId: lastMessage.messageId || "",
			question: lastMessage.generatedQuestion || "",
		});

		if ((updatedAnswer?.userResponseScore || 0) >= 5) {
			setShowTrophy(true);

			setTimeout(() => {
				setShowTrophy(false);
			}, 3000);
		}

		messagesListRef.current.updateLastMessage(new Message(updatedAnswer));

		setMessages([
			...messagesListRef.current.messages.map((msg) => new Message(msg)),
		]);
	};

	return {
		messagesList: messages,
		handleSendMessage,
		isSendingMessage,
		showEmptySection,
		showNewMessageForm,
		showAnswerForm,
		handleAnswerQuestion,
		showTrophy,
	};
};
