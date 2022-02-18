import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Segment, Menu, Container } from "semantic-ui-react";

const Nav = () => {
  const { pathname } = useLocation();

  return (
    <Segment size='tiny'>
      <Menu size='large' secondary>
        <Container>
          <Link to='/'>
            <Menu.Item name='Users' active={pathname === "/"} />
          </Link>
          <Link to='/todos'>
            <Menu.Item name='Todos' active={pathname === "/todos"} />
          </Link>
        </Container>
      </Menu>
    </Segment>
  );
};

export default Nav;
