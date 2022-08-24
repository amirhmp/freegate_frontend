import APIError from "@models/ApiError";
import { ApiResult } from "@models/ApiResult";
import { useEffect, useRef, useState } from "react";

type APIFunc<O> = (...args: any[]) => Promise<ApiResult<O>>;
type IFunc<F extends APIFunc<any>> = Parameters<F>;
type OFunc<F extends APIFunc<any>> = Awaited<ReturnType<F>>["data"];

function useApi<F extends APIFunc<any>>(
  apiFunc: F,
  onSuccess?: (data: NonNullable< OFunc<F>>, ...args: IFunc<F>) => OFunc<F>,
  onFail?: (error: APIError, ...args: IFunc<F>) => APIError | undefined,
  initialData?: OFunc<F>
) {
  const isUnMounted = useRef(false);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<OFunc<F> | undefined>(
    initialData || undefined
  );

  const [error, setError] = useState<APIError | undefined>(undefined);

  useEffect(() => {
    isUnMounted.current = false;
    return () => {
      isUnMounted.current = true; //Prevent memory leak //TODO: cancel api calls
    };
  }, []);

  const request: (...args: IFunc<F>) => void = (...args) => {
    setLoading(true);
    apiFunc(...args)
      .then((response) => {
        if (isUnMounted.current) {
          return;
        }

        const { success, error, data } = response;
        if (success) {
          setError(undefined);
          setData(onSuccess ? onSuccess(data, ...args) : data);
        } else {
          const _error = onFail ? onFail(error!, ...args) : error;
          setError(_error);
        }
      })
      .catch((_error) => {
        console.log("useApi:unhandled api call error: ", error);
      })
      .finally(() => {
        if (!isUnMounted.current) {
          setLoading(false);
        }
      });
  };

  return {
    request,
    error,
    isLoading,
    data,
    setData,
  };
}

export default useApi;
