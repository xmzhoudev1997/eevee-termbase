import request from "./request";

export interface PERFORM_CLASS {
  name: string;
  children: PERFORM_INFO[];
}

export interface PERFORM_INFO {
  id: number;
  name: string;
}

export const queryPerformList = () => request<PERFORM_CLASS[]>({
  url: `/api/perform/tags`,
  method: 'GET',
});

export const queryPerformSourcesList = (performId: number) => request<string[]>({
  url: `/api/perform/${performId}/sources`,
  method: 'GET',
});