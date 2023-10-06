import { RootState } from '@redux/store';
import { UserType } from 'interface/user';
import { useAppSelector } from './useAppSelector';

const useProfile = (): UserType | null => {
  return useAppSelector((state: RootState) => state.userReducer).profile;
};

export default useProfile;
