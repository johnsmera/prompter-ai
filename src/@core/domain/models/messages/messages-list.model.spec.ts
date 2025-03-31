import { MessagesList } from "./messages-list.model";
import { Message } from "./messages.model";

describe("MessagesList", () => {
	let messagesList: MessagesList;
	let initialMessages: Message[];

	beforeEach(() => {
		initialMessages = [
			new Message({
				messageId: "1",
				responseMessage: "Hello",
				userResponseMessage: "Hi",
				userResponseScore: 1,
				createdAt: new Date().toISOString(),
				userId: "user123",
				userMessage: "Hello",
			}),
			new Message({
				messageId: "2",
				responseMessage: "Good",
				userResponseMessage: "Yes",
				userResponseScore: 1,
				createdAt: new Date().toISOString(),
				userId: "user2",
				userMessage: "Hello 2",
			}),
		];
		messagesList = new MessagesList(initialMessages);
	});

	it("should initialize with start messages", () => {
		expect(messagesList.messages.length).toBe(2);
	});

	it("should add a new message", () => {
		const newMessage = new Message({
			messageId: "3",
			responseMessage: "How are you?",
			userResponseMessage: "Great",
			userResponseScore: 4,
			createdAt: new Date().toISOString(),
			userId: "user3",
			userMessage: "Hello 3",
		});
		messagesList.addMessage(newMessage);
		expect(messagesList.messages.length).toBe(3);
		expect(messagesList.messages[2]).toBe(newMessage);
	});

	it("should get the latest message", () => {
		const latestMessage = messagesList.getLatestMessage();
		expect(latestMessage.messageId).toBe("2");
	});

	it("should update an existing message", () => {
		const updatedMessage = new Message({
			messageId: "1",
			responseMessage: "Hello!",
			userResponseMessage: "Hi!",
			userResponseScore: 5,
			createdAt: new Date().toISOString(),
			userId: "user123",
			userMessage: "Hello",
		});
		messagesList.updateMessage(updatedMessage);
		expect(messagesList.messages[0].responseMessage).toBe("Hello!");
		expect(messagesList.messages[0].userResponseMessage).toBe("Hi!");
		expect(messagesList.messages[0].userResponseScore).toBe(5);
	});

	it("should not update a non-existing message", () => {
		const nonExistingMessage = new Message({
			messageId: "3",
			responseMessage: "New",
			userResponseMessage: "New",
			userResponseScore: 3,
			createdAt: new Date().toISOString(),
			userId: "user4",
			userMessage: "Hello 4",
		});
		messagesList.updateMessage(nonExistingMessage);
		expect(messagesList.messages.length).toBe(2);
	});

	it("should update the last message", () => {
		const lastMessageUpdate = new Message({
			messageId: "2",
			responseMessage: "How are you doing?",
			userResponseMessage: "Great",
			userResponseScore: 4,
      createdAt: new Date().toISOString(),
      userId: "user2",
      userMessage: "Hello 2",
		});
		messagesList.updateLastMessage(lastMessageUpdate);
		const lastMessage = messagesList.getLatestMessage();
		expect(lastMessage.responseMessage).toBe("How are you doing?");
		expect(lastMessage.userResponseMessage).toBe("Great");
		expect(lastMessage.userResponseScore).toBe(4);
	});

	it("should not update the last message if the list is empty", () => {
		messagesList = new MessagesList([]);
		const lastMessageUpdate = new Message({
			messageId: "1",
			responseMessage: "Hello",
			userResponseMessage: "Hi",
			userResponseScore: 1,
      createdAt: new Date().toISOString(),
      userId: "user123",
      userMessage: "Hello",
		});
		messagesList.updateLastMessage(lastMessageUpdate);
		expect(messagesList.messages.length).toBe(0);
	});
});
