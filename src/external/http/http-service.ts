import { ResponseType } from './response-type';

export interface HttpService {
  get<TResponse>(
    url: string,
    headers?: object,
    params?: object,
  ): Promise<ResponseType<TResponse>>;
  post<TResponse, TRequest>(
    url: string,
    body: TRequest,
    headers?: object,
    params?: object,
  ): Promise<ResponseType<TResponse>>;
}
