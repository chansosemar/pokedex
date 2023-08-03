import {useState} from 'react';
import axios, {AxiosResponse} from 'axios';
import {useSetRecoilState, SetRecoilState, RecoilState} from 'recoil';

type FetchDataSetter = SetRecoilState<any>;
type FetchDataFromApi = (url: string | null, next?: boolean) => Promise<void>;

const useFetchData = (
  state: RecoilState<any>,
): {fetchDataFromApi: FetchDataFromApi; loading: boolean} => {
  const setFetchData: FetchDataSetter = useSetRecoilState(state);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchDataFromApi: FetchDataFromApi = async (url, next) => {
    if (url) {
      setLoading(true);
      try {
        const response: AxiosResponse<any> = await axios.get(url);
        const data: any = await response.data;
        if (next) {
          setFetchData((prevData: any) => ({
            ...response.data,
            results: [
              ...new Map(
                [...prevData.results, ...response.data.results].map(item => [
                  item.name,
                  item,
                ]),
              ).values(),
            ],
          }));
        } else {
          setFetchData(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return {fetchDataFromApi, loading};
};

export default useFetchData;
