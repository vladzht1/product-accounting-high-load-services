export class Result<T> {
  private _data: T | null;
  private _error: Error | null;

  public static createOk<T>(data: T): Result<T> {
    return new Result<T>(data, null);
  }

  public static createError<T>(error: Error): Result<T> {
    return new Result<T>(null, error);
  }

  private constructor(data: T | null, error: Error | null) {
    this._data = data;
    this._error = error;
  }

  public ok(): boolean {
    return this._data !== null;
  }

  public failed(): boolean {
    return this._error !== null;
  }

  public data(): T {
    if (!this.ok()) {
      throw new Error("Invalid state: result has error")
    }

    return this._data!;
  }

  public error(): Error {
    if (!this.failed()) {
      throw new Error("Invalid state: result has data")
    }

    return this._error!;
  }
}
