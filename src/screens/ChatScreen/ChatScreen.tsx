"use client";

import type { Message } from "@/@core/domain/models/messages/messages.model";

import { ChatMessage } from "@/components/chat-message";
import { ChatScreenHeader } from "./components/chat-screen-header";
import { useChatScreen } from "./hooks/use-chat-screen.hook";

import styles from "./chat-screen.module.css";
import React, { useEffect, useRef } from "react";

export const ChatScreen = ({
	messages: initialMessages,
}: { messages: Message[] }) => {
	const chatEndRef = useRef<HTMLDivElement | null>(null);

	const {
		messagesList,
		handleSendMessage,
		isSendingMessage,
		showEmptySection,
		showNewMessageForm,
		showAnswerForm,
		handleAnswerQuestion,
		showTrophy,
	} = useChatScreen(initialMessages);

	const getScoreMessage = (score: number) => {
		if (score >= 0 && score <= 2) {
			return "Foi por pouco, continue tentando!";
		}

		if (score >= 3 && score <= 4) {
			return "Você está indo bem, continue assim!";
		}

		if (score >= 6) {
			return "Parabéns, você acertou!";
		}

		if (score > 5 && score <= 10) {
			return "Uau, você é muito bom nisso!";
		}

		if (score === 10) {
			return "Você é um gênio!";
		}

		return "Você pode melhorar, continue tentando!";
	};

	const renderUserMessage = (message: Message) => {
		return (
			<div className="flex justify-end">
				<ChatMessage className="bg-purple-600">
					{message.userMessage}
				</ChatMessage>
			</div>
		);
	};

	const renderResponseMessage = (message: Message) => {
		return (
			<>
      {/* vai ter um modal no meio entao deve ter o position correto */}
				<div className="flex justify-start space-y-2 flex-col relative">
					<ChatMessage>{message.extractResponseMessage()}</ChatMessage>

					{message.generatedQuestion && (
						<ChatMessage className="bg-gray-800 border border-purple-400">
							{message.generatedQuestion}
						</ChatMessage>
					)}
				</div>
				{message.userResponseMessage && (
					<>
						<div className="flex justify-end">
							<ChatMessage className="bg-purple-600">
								{message.userResponseMessage}
							</ChatMessage>
						</div>

						<div className="flex justify-start space-y-2 flex-col">
							<ChatMessage>
								{getScoreMessage(message.userResponseScore || 0)}
							</ChatMessage>
						</div>
					</>
				)}
			</>
		);
	};

	const renderNewMessageForm = () => {
		return (
			<form
				className="bg-gray-800 p-4 flex items-center border-t border-gray-700"
				action={(e) => {
					const message = e.get("message") as string;
					handleSendMessage(message);
				}}
			>
				<input
					type="text"
					name="message"
					placeholder="Escreva sua pergunta :)"
					className="flex-1 border border-gray-600 p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
				/>

				{!isSendingMessage && (
					<button
						type="submit"
						className="bg-purple-600 text-white px-4 py-2 rounded-lg ml-2 hover:bg-purple-500 transition"
					>
						Enviar
					</button>
				)}
			</form>
		);
	};

	const renderAnswerQuestion = () => {
		return (
			<form
				className="bg-gray-800 p-4 flex items-center border-t border-gray-700"
				action={(e) => {
					const userAnswer = e.get("userAnswer") as string;
					handleAnswerQuestion(userAnswer);
				}}
			>
				<input
					type="text"
					name="userAnswer"
					placeholder="Responda a pergunta acima :)"
					className="flex-1 border border-gray-600 p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
				/>

				{!isSendingMessage && (
					<button
						type="submit"
						className="bg-purple-600 text-white px-4 py-2 rounded-lg ml-2 hover:bg-purple-500 transition"
					>
						Responder
					</button>
				)}
			</form>
		);
	};

	const scrollToBottom = () => {
		if (chatEndRef.current) {
			chatEndRef.current.scrollIntoView({ behavior: "smooth" });
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		scrollToBottom();
	}, [messagesList]);

	return (
		<div className="flex flex-col h-screen bg-gray-900 text-white">
			<ChatScreenHeader />

			<main className="flex-1 overflow-y-auto p-4 space-y-4">
				<div className="space-y-4">
					{messagesList.map((message, key) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<React.Fragment key={key}>
							{renderUserMessage(message)}
							{renderResponseMessage(message)}
						</React.Fragment>
					))}
					<div ref={chatEndRef} />
				</div>
			</main>

			{showTrophy && <div className={styles.trophy}>🏆</div>}

			{showEmptySection && (
				<>
					<div className="flex justify-center items-center h-full">
						<p className="text-2xl">Vamos iniciar uma conversa</p>
					</div>

					{renderNewMessageForm()}
				</>
			)}

			{!showEmptySection && (
				<>
					{showAnswerForm && renderAnswerQuestion()}
					{showNewMessageForm && renderNewMessageForm()}
				</>
			)}
		</div>
	);
};
