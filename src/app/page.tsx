"use server";

import { listMessagesUsecase } from "@/@core/application/usecases/message/instances/message-instances";
import { ChatScreen } from "@/screens/ChatScreen/ChatScreen";
import { serializeToJSON } from "@/utils/serializeToJSON";

export default async function Home() {
	const fetchMessages = async () => {
		const response = await listMessagesUsecase.execute({});

		return serializeToJSON(response);
	};

	const messages = await fetchMessages();

	return <ChatScreen messages={messages} />;
}
