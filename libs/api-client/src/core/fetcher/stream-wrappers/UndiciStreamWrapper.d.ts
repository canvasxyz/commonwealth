import { StreamWrapper } from './chooseStreamWrapper';

declare type EventCallback = (data?: any) => void;

export declare class UndiciStreamWrapper<
  ReadFormat extends Uint8Array | Uint16Array | Uint32Array,
> implements
    StreamWrapper<
      UndiciStreamWrapper<ReadFormat> | WritableStream<ReadFormat>,
      ReadFormat
    >
{
  private readableStream;
  private reader;
  private events;
  private paused;
  private resumeCallback;
  private encoding;

  constructor(readableStream: ReadableStream<ReadFormat>);

  on(event: string, callback: EventCallback): void;

  off(event: string, callback: EventCallback): void;

  pipe(
    dest: UndiciStreamWrapper<ReadFormat> | WritableStream<ReadFormat>,
  ): UndiciStreamWrapper<ReadFormat> | WritableStream<ReadFormat>;

  pipeTo(
    dest: UndiciStreamWrapper<ReadFormat> | WritableStream<ReadFormat>,
  ): UndiciStreamWrapper<ReadFormat> | WritableStream<ReadFormat>;

  unpipe(dest: UndiciStreamWrapper<ReadFormat> | WritableStream<any>): void;

  destroy(error?: Error): void;

  pause(): void;

  resume(): void;

  get isPaused(): boolean;

  read(): Promise<ReadFormat | undefined>;

  setEncoding(encoding: string): void;

  text(): Promise<string>;

  json<T>(): Promise<T>;

  private _write;
  private _end;
  private _error;
  private _emit;
  private _startReading;

  [Symbol.asyncIterator](): AsyncIterableIterator<ReadFormat>;
}

export {};
