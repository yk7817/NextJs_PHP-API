import { UsersType } from "./types";

const getUsers = async (): Promise<UsersType[] | null> => {
  try {
    const res = await fetch("http://localhost:8000/api/users.php");
    if (!res.ok) {
      return null;
    }
    const usersData = await res.json();
    return usersData;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getUsers;
