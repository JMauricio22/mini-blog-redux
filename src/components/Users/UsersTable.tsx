import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Table, Icon, Header, Image } from "semantic-ui-react";
import { Users, User } from "../../interfaces/user.model";
import { State } from "../../actions/types";

interface UsersTableProps {
  users: Users;
}

const UsersTable = ({ users }: UsersTableProps) => {
  return (
    <>
      <Header as='h1' textAlign='center'>
        <u>Users</u>
      </Header>
      <Table basic size='large' celled striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Website</Table.HeaderCell>
            <Table.HeaderCell>Posts</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {Object.values(users).map((user: User) => (
            <Table.Row key={user.id}>
              <Table.Cell>
                <img
                  width={30}
                  height={30}
                  src={`https://avatars.dicebear.com/api/avataaars/${user.name}.svg`}
                  alt={user.name}
                />
                <span>{user.name}</span>
              </Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.website}</Table.Cell>
              <Table.Cell>
                <Link to={`/posts/${user.id}`}>
                  <Icon name='eye' />
                </Link>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
};

const mapStateToProps = (state: State) => ({
  users: state.usersReducer.users,
});

export default connect(mapStateToProps)(UsersTable);
