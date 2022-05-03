export type OnlyResponse<TResponse> = () => Promise<TResponse>;
export type OnlyRequest<TRequest> = (request: TRequest) => Promise<void>;
export type RequestAndResponse<TRequest, TResponse> = (request: TRequest) => Promise<TResponse>;

type BaseExecuteType<TRequest, TResponse> = 
RequestAndResponse<TRequest, TResponse> | 
OnlyResponse<TResponse> | 
OnlyRequest<TRequest>;

interface UseCase<TBaseExecuteType extends BaseExecuteType<any, any>> {
  execute: TBaseExecuteType;
}

export default UseCase;
