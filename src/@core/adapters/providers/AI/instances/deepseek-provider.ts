import { DeepSeekProvider } from "../DeepseekProvider";
import { openAiInstance } from "@/@core/drivers/openai/openai-instance";

export const deepSeekProvider = new DeepSeekProvider(openAiInstance);
