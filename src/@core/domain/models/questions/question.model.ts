export interface IQuestion {
	question: string;
	answer: string;
}

export class Question implements IQuestion {
	public question: string;
	public answer: string;

	constructor({ question }: { question: IQuestion }) {
		this.question = question.question;
		this.answer = question.answer;
	}

	static makeCheckAnswerIsCorrectPrompt(question: IQuestion): string {
		return `
        Você deve responder se a questão foi respondida corretamente ou não.
        
        Você deve dar uma nota de 0 a 10(apenas, não use decimais e retorne apenas o número).

        Questão: ${question.question}
        Resposta: ${question.answer}
    `;
	}
}
