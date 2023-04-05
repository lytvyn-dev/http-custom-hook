import { useState, useCallback } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (requestOptions, onGetData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(requestOptions.url, {
        method: requestOptions.method ? requestOptions.method : "GET",
        body: requestOptions.body ? JSON.stringify(requestOptions.body) : null,
        headers: requestOptions.headers ? requestOptions.headers : {},
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
      onGetData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    request,
  };
};

export default useHttp;
