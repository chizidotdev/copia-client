type APIResponse<T> = {
  data: T;
  error: ErrorResponse;
};

interface ErrorResponse {
  message_id: string;
  message: string;
  code: number;
  reason: string;
}
