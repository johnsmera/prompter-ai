import { OpenAIProvider } from "../OpenAIProvider";
import { openAiInstance } from "@/@core/drivers/openai/openai-instance";

export const openAIProvider = new OpenAIProvider(openAiInstance);
