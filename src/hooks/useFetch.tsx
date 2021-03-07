import { useEffect, useState } from "react"

const useFetch = (url: string, dataType: string, id?: string) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);

  if (!id) {
    id = '';
  }

  const fetchData = async () => {
    const apiCall = await fetch(url + dataType + `/${id}`);
    const response = await apiCall.json();
    setData(response);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [isUpdated])

  return { data, isLoading, isUpdated, setIsUpdated };
}

export default useFetch;