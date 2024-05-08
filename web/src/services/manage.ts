import request from "./request";

export interface TAG_COUNT {
  id: number;
  name: string;
  subCount: number;
}

export interface PERFORM_MANAGE {
  id: number;
  name: string;
  sources: string[];
  tagId: number;
  search: string;
  schedule: number;
}

export const checkManageAuth = () => request<boolean>({
  url: `/api/manage/auth`,
  method: 'GET',
});

export const addManageAuth = (token: string) => request<void>({
  url: `/api/manage/auth/${token}`,
  method: 'POST',
});

export const queryTagList = (id: number) => request<TAG_COUNT[]>({
  url: `/api/manage/tags/${id}`,
  method: 'GET',
});
export const addTag = (parentId: number, name: string) => request<void>({
  url: `/api/manage/tag/${parentId}`,
  method: 'POST',
  params: {
    name,
  }
});
export const updateTagName = (id: number, name: string) => request<void>({
  url: `/api/manage/tag/${id}/rename`,
  method: 'PUT',
  params: {
    name,
  }
});
export const updateTagSort = (id: number, sort: number) => request<void>({
  url: `/api/manage/tag/${id}/sort`,
  method: 'PUT',
  params: {
    sort,
  }
});
export const deleteTag = (id: number) => request<void>({
  url: `/api/manage/tag/${id}`,
  method: 'DELETE',
});

export const queryPerformList = () => request<PERFORM_MANAGE[]>({
  url: `/api/manage/performs`,
  method: 'GET',
});
export const getPerform = (id: number) => request<PERFORM_MANAGE>({
  url: `/api/manage/perform/${id}`,
  method: 'GET',
});
export const addPerform = (obj: Omit<PERFORM_MANAGE, 'id'>) => request<void>({
  url: `/api/manage/perform`,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(obj)
});
export const updatePerform = (id: number, obj: Omit<Partial<PERFORM_MANAGE>, 'id'>) => request<void>({
  url: `/api/manage/perform/${id}`,
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(obj)
});
export const updatePerformSort = (id: number, sort: number) => request<void>({
  url: `/api/manage/perform/${id}/sort`,
  method: 'PUT',
  params: {
    sort,
  }
});
export const deletePerform = (id: number) => request<void>({
  url: `/api/manage/perform/${id}`,
  method: 'DELETE',
});
export const updatePerformSource = (id: number) => request<void>({
  url: `/api/manage/perform/${id}/source`,
  method: 'PUT',
});
export const updateAllPerformSource = () => request<void>({
  url: `/api/manage/perform/source`,
  method: 'POST',
});
export const getSource = (kwd: string) => request<{ name: string, url: string }[]>({
  url: `/api/manage/perform/source`,
  method: 'POST',
  params: {
    kwd,
    num: 20,
  }
});