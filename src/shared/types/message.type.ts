export type StringMessage = string;
export type ObjectMessage = Object;

export type Message = Record<string, string> | StringMessage | ObjectMessage;
