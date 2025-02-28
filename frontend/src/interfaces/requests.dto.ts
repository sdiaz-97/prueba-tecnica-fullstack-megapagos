export interface responseDto {
    status: number,
    message: string,
    data: any
}

export interface RequestOptions {
    method: string;
    headers: Record<string, string>;
    credentials: RequestCredentials;
    body?: string;
  }