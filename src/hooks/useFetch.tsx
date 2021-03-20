import { useEffect, useState } from "react";

const useFetch = (url: string, dataType: string, id?: string) => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  
  const fetchData = async () => {
    let fullURL = '';
    if (id) {
      fullURL = url + dataType + `/${id}`;
    } else {
      fullURL = url + dataType;
    }
    
    try {
      const apiCall = await fetch(fullURL);
      const response = await apiCall.json();
      if (Array.isArray(response)) {
        setData(response);
      } else {
        setData([response]);
      }
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }

  };

  useEffect(() => {
    fetchData();
    return () => {
      console.log('Clean up');
      setIsLoading(true);
    }
  }, [isUpdated]);

  return { data, isLoading, isUpdated, setIsUpdated };
}

export default useFetch;