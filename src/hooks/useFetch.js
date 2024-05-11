import { useCallback, useState } from "react";

const useFetch = ({ url = "", method = "" }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({});

  const fetchData = useCallback(
    async ({ payload = {}, handleUpdateJdData = () => {}, signal = null }) => {
      setLoading(true);

      try {
        const res = await fetch(url, {
          signal,
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const response = await res.json();

        handleUpdateJdData(response || {});

        setData(response);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    },
    [method, url]
  );

  return { loading, error, data, fetchData };
};

export default useFetch;
