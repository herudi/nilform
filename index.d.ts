import type { IncomingMessage } from "http";
type TField = { [k: string]: any };
type TBlob = { [k: string]: Blob | Blob[] };
export type TResult = [TField, TBlob];
export function parse(req: IncomingMessage): Promise<TResult>;
export function hasForm(req: IncomingMessage): boolean;
