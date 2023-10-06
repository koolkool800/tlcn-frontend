import { useSearchParams } from 'react-router-dom';

function useParam() {
  const [searchParams] = useSearchParams();
  const paramUrl = Object.fromEntries([...searchParams]);
  return paramUrl;
}

export default useParam;
