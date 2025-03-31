import type { IAIProvider } from "../../../application/providers/IAIProvider";
import type { OpenAI } from "openai";

export class DeepSeekProvider implements IAIProvider {
	constructor(private readonly openAiSDK: OpenAI) {}

	async generateResponse(message: string): Promise<string> {
		const response = await this.openAiSDK.chat.completions.create({
			messages: [{ role: "system", content: message }],
			model: "deepseek-chat",
		});

		return response.choices[0].message.content || "";
	}
}
