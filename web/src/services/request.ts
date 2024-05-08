import umiRequest, { RequestOptionsInit, RequestResponse } from "umi-request";

interface Request extends RequestOptionsInit {
  url: string;
}

export default async <T>(request: Request): Promise<T> => {
  const { url, ...ext } = request;
  return umiRequest(url, ext)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((res: RequestResponse) => {
      console.log(res);
      throw new Error("");
    }) as Promise<T>;
};