import { request, type APIRequestContext, type APIResponse } from '@playwright/test';

export class HttpClient {
  private ctx: APIRequestContext | null = null;

  async init(baseURL: string): Promise<void> {
    this.ctx = await request.newContext({ baseURL });
  }

  private get context(): APIRequestContext {
    if (!this.ctx) throw new Error('HttpClient not initialized. Call init() first.');
    return this.ctx;
  }

  async get(path: string): Promise<APIResponse> {
    return this.context.get(path, { failOnStatusCode: false });
  }

  async post(path: string, json?: unknown): Promise<APIResponse> {
    return this.context.post(path, { data: json, failOnStatusCode: false });
  }

  async dispose(): Promise<void> {
    await this.ctx?.dispose();
    this.ctx = null;
  }
}
