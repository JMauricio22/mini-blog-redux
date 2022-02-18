import axios, { AxiosResponse } from "axios";
import { GET_ALL, LOADING, ERROR } from "../types/usersTypes";
import { User, Users } from "../interfaces/user.model";

export const getAll = () => async (dispatch: any) => {
  try {
    dispatch({
      type: LOADING,
    });
    const { data }: AxiosResponse<User[]> = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    const users: Users = data.reduce((obj: Users, item: User) => {
      obj[item.id] = item;
      return obj;
    }, {});

    dispatch({
      type: GET_ALL,
      payload: users,
    });
  } catch (error: any) {
    console.log("Error:", error.message);
    dispatch({
      type: ERROR,
      payload: error.message,
    });
  }
};
