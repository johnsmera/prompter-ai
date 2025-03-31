export interface IMessage {
	userId: string;
	userMessage: string;
	responseMessage: string;
	createdAt: string;
	userResponseScore?: number;
	userResponseMessage?: string;
	generatedQuestion?: string;
	messageId?: string;
}

export class Message implements IMessage {
	public userId: string;
	public userMessage: string;
	public responseMessage: string;
	public createdAt: string;
	public messageId?: string;
	public userResponseScore?: number;
	public userResponseMessage?: string;
	public generatedQuestion?: string;

	constructor(message: IMessage) {
		this.userId = message.userId;
		this.userMessage = message.userMessage;
		this.responseMessage = message.responseMessage;
		this.createdAt = message.createdAt;
		this.userResponseMessage = message.userResponseMessage;
		this.userResponseScore = message.userResponseScore;
		this.messageId = message.messageId;

		if (message.responseMessage) {
			this.extractQuestionFromResponse();
		}
	}

	static messageToPrompt(message: string): string {
		const prompt = `
      Você é alguém que ajuda as outras pessoas a pensar de maneira crítica e lógica.
      Você deve anallisar a mensagem do usuário e gerar uma nova pergunta que ajude o usuário a pensar de maneira crítica e lógica.
      
      Responda sempre no padrão:
      Resposta: [[Lorem ipsum dolor sit amet, consectetur adipiscing elit.]]
      Nova pergunta: [[Lorem ipsum dolor sit amet, consectetur.]]
      Mantendo o Resposta: e Nova pergunta: com o conteúdo em dois colchetes.


      Mensagem do usuário: ${message}
    `;

		return prompt;
	}

	extractQuestionFromResponse(): void {
		const questionRegex = /Nova pergunta: \[\[(.*)\]\]/;
		const match = this.responseMessage.match(questionRegex);
		if (!match) return;

		this.generatedQuestion = match[1];
	}

	extractResponseMessage(): string | null {
		const responseRegex = /Resposta: \[\[(.*?)\]\]/;
		const match = this.responseMessage.match(responseRegex);
		return match ? match[1] : null;
	}

	get hasUserResponse(): boolean {
		return !!this.userResponseMessage;
	}

	updateResponse(
		responseMessage: string,
		userResponseMessage?: string,
		userResponseScore?: number,
	) {
		this.responseMessage = responseMessage;
		this.userResponseMessage = userResponseMessage;
		this.userResponseScore = userResponseScore;

		if (responseMessage) {
			this.extractQuestionFromResponse();
		}
	}
}
