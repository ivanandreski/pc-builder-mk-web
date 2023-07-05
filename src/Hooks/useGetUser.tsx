import {User} from "../Models/User";

const useGetUser = (): User | undefined => {
  return localStorage.getItem("user") != undefined
    ? (JSON.parse(localStorage.getItem("user")!) as User)
    : undefined;
};

export default useGetUser;
