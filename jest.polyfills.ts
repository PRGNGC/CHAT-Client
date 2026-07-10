// const { TextDecoder, TextEncoder } = require("node:util");
// const { ReadableStream, TransformStream } = require("node:stream/web");
// const { performance } = require("node:perf_hooks");
import { TextDecoder, TextEncoder } from "util";
import { ReadableStream, TransformStream } from "node:stream/web";
import { performance } from "perf_hooks";

Object.defineProperties(globalThis, {
	TextDecoder: { value: TextDecoder },
	TextEncoder: { value: TextEncoder },
	ReadableStream: { value: ReadableStream },
	TransformStream: { value: TransformStream },
	performance: { value: performance }
});

// const { Blob, File } = require("node:buffer");
// const { fetch, Headers, FormData, Request, Response } = require("undici");
import { Blob, File } from "buffer";
import { fetch, Headers, FormData, Request, Response } from "undici";

Object.defineProperties(globalThis, {
	fetch: { value: fetch, writable: true },
	Blob: { value: Blob },
	File: { value: File },
	Headers: { value: Headers },
	FormData: { value: FormData },
	Request: { value: Request },
	Response: { value: Response }
});
