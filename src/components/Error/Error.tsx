import React from "react";
import { Header, Image, Button, Segment, Icon } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import errorImage from "../../assets/images/fogg-fatal-error-3.png";

interface ErrorProps {
  message?: string;
}

const Error = ({ message = "404 Page not found" }: ErrorProps) => {
  const history = useHistory();

  const goToHomePage = () => {
    history.push("/");
  };

  return (
    <Segment textAlign='center' basic>
      <Header as='h1'>Opps! Something went wrong</Header>
      {message && (
        <Header className='center' as='h3'>
          <i>{message}</i>
        </Header>
      )}
      <Button color='black' onClick={goToHomePage}>
        <Icon name='chevron circle left' />
        Home
      </Button>
      <Image fluid src={errorImage} />
    </Segment>
  );
};
export default Error;
