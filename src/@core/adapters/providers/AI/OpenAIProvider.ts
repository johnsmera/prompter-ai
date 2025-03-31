import type { IAIProvider } from "../../../application/providers/IAIProvider";
import type { OpenAI } from "openai";

export class OpenAIProvider implements IAIProvider {
	constructor(private readonly openAiSDK: OpenAI) {}

	async generateResponse(message: string): Promise<string> {
		const response = await this.openAiSDK.chat.completions.create({
			messages: [{ role: "user", content: message }],
			model: "gpt-4o-mini",
		});

    console.log(response.choices[0].message.content);

		return response.choices[0].message.content as string;
	}
}
