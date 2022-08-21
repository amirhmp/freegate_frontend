import { useEffect, useRef, useState } from "react";
import APIError from "@models/ApiError";
import { ApiResult } from "@models/ApiResult";

type APIFunc<O, I> = (...args: I[]) => Promise<ApiResult<O>>;
type DataOfAPIFunc<O> = Awaited<ReturnType<APIFunc<O, any>>>["data"];

function useApi<O, I>(
  apiFunc: APIFunc<O, I>,
  preSetData?: (data: DataOfAPIFunc<O>) => DataOfAPIFunc<O>,
  initialData?: DataOfAPIFunc<O>
) {
  const isUnMounted = useRef(false);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<DataOfAPIFunc<O> | undefined>(
    initialData || undefined
  );

  const [error, setError] = useState<APIError | undefined>(undefined);

  // const { isConnected, isInternetReachable } = useNetInfo();
  // const { isNoNetworkDialogVisible, setNetworkDialogVisibility } = useNetworkStateContext();

  useEffect(() => {
    isUnMounted.current = false;
    return () => {
      isUnMounted.current = true; //Prevent memory leak //TODO: cancel api calls
    };
  }, []);

  const request: (...args: Parameters<APIFunc<O, I>>) => void = (
    ...args: any[]
  ) => {
    // if (isConnected === false) return setNetworkDialogVisibility(true);
    setLoading(true);
    apiFunc(...args)
      .then((response) => {
        if (isUnMounted.current) {
          console.log("unmounted");
          return;
        }

        const { success, error, data } = response;
        if (success) {
          setError(undefined);
          setData(preSetData ? preSetData(data) : data);
        } else {
          setError(error);
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
