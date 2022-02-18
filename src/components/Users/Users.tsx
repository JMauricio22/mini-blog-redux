import React, { useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "../Spinner/Spinner";
import Error from "../Error/Error";
import UsersTable from "./UsersTable";
import { getAll } from "../../actions/usersActions";
import { Users as UsersType } from "../../interfaces/user.model";
import { State } from "../../actions/types";

interface UsersProps {
  loading: boolean;
  error: string;
  users: UsersType;
  getAll();
}

const Users = (props: UsersProps) => {
  const { users, getAll } = props;

  useEffect(() => {
    if (Object.values(users).length === 0) {
      getAll();
    }
  }, [getAll, users]);

  if (props.loading) {
    return <Spinner />;
  }

  if (props.error) {
    return <Error message={props.error} />;
  }

  return <UsersTable />;
};

const mapStateToProps = (state: State) => {
  return {
    ...state.usersReducer,
  };
};

export default connect(mapStateToProps, { getAll })(Users);
