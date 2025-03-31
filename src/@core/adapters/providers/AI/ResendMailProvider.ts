import type { IMailProvider } from "@/@core/application/providers/IMailProvider";

export class ResendMailProvider implements IMailProvider {
	async sendMail(to: string, subject: string, body: string): Promise<void> {
		console.log(`ResendMailProvider: ${to} - ${subject} - ${body}`);
	}
}
