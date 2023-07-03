interface User {
  token: number;
  email: string;
}

const useGetUser = (): User | undefined => {
  return localStorage.getItem("token") != undefined
    ? (JSON.parse(localStorage.getItem("token")!) as User)
    : undefined;
};

export default useGetUser;
