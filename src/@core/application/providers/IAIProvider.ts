export interface IAIProvider {
  generateResponse(message: string): Promise<string>;
}