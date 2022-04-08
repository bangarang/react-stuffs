import { useEffect, useState } from "react";

export const useFetch = (
  url: RequestInfo,
  options: RequestInit | undefined
) => {
  const [response, setResponse] = useState<{ response: { title: string } }>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url, options);
        const json = await res.json();
        setResponse(json);
      } catch (error) {
        // @ts-ignore
        setError(error);
      }
    };
    fetchData();
  }, [url]);

  return { response, error };
};
