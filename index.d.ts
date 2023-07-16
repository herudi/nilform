import type { IncomingMessage } from "node:http";
type TBody = { [k: string]: any };
type TFile = { [k: string]: Blob | Blob[] };
export type TResult = [TBody, TFile];
export function parse(req: IncomingMessage): Promise<TResult>;
export function hasForm(req: IncomingMessage): boolean;
