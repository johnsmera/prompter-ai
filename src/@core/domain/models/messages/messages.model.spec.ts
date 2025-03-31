import { Message, type IMessage } from "./messages.model";

describe("Message", () => {
	let messageData: IMessage;

	beforeEach(() => {
		messageData = {
			userId: "user123",
			userMessage: "Qual é a capital do Brasil?",
			responseMessage:
				"Resposta: [[A capital do Brasil é Brasília.]] Nova pergunta: [[Quem foram os responsáveis pelo projeto urbanístico de Brasília?]]",
			createdAt: new Date().toISOString(),
		};
	});

	it("should create an instance of Message", () => {
		const message = new Message(messageData);
		expect(message).toBeInstanceOf(Message);
		expect(message.userId).toBe(messageData.userId);
		expect(message.userMessage).toBe(messageData.userMessage);
		expect(message.responseMessage).toBe(messageData.responseMessage);
		expect(message.createdAt).toBe(messageData.createdAt);
	});

	it("should extract question from response message", () => {
		const message = new Message(messageData);
		expect(message.generatedQuestion).toBe(
			"Quem foram os responsáveis pelo projeto urbanístico de Brasília?",
		);
	});

	it("should return false if user has not responded", () => {
		const message = new Message(messageData);
		expect(message.hasUserResponse).toBe(false);
	});

	it("should generate the correct prompt from message", () => {
		const prompt = Message.messageToPrompt("Qual é a capital do Brasil?");
		expect(prompt).toContain(
			"Mensagem do usuário: Qual é a capital do Brasil?",
		);
		expect(prompt).toContain(
			"Resposta: [[Lorem ipsum dolor sit amet, consectetur adipiscing elit.]]",
		);
		expect(prompt).toContain(
			"Nova pergunta: [[Lorem ipsum dolor sit amet, consectetur .]]",
		);
	});

	it("should extract response message correctly", () => {
		const message = new Message(messageData);
		message.extractQuestionFromResponse();
		expect(message.generatedQuestion).toBe(
			"Quem foram os responsáveis pelo projeto urbanístico de Brasília?",
		);
	});

	it("should extract response message correctly", () => {
		const message = new Message(messageData);
		expect(message.extractResponseMessage()).toBe("A capital do Brasil é Brasília.");
	});
});
