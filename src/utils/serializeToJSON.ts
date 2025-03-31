export function serializeToJSON<T>(data: T): T {
	return JSON.parse(JSON.stringify(data));
}
