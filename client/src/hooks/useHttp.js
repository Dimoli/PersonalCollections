import { useState, useCallback } from "react";

export default () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (
      url,
      method = "GET",
      body = null,
      headers = { "Access-Control-Allow-Origin": "no-cors" }
    ) => {
      setLoading(true);

      if (body) {
        body = JSON.stringify(body);
        headers["Content-Type"] = "application/json";
      }

      try {
        const response = await fetch(url, { method, body, headers });
        let data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Somethig wrong");
        }

        setLoading(false);

        return data;
      } catch (e) {
        setLoading(false);
        setError(e.message);
        throw e;
      }
    },
    []
  );

  return { loading, request, error };
};
