import React from "react";
import { Segment, Icon, List } from "semantic-ui-react";

const Footer = () => {
  return (
    <Segment basic color='black' inverted size='big'>
      <List size='mini' divided>
        <List.Item>
          <List.Content className='center'>
            Cretead by Mauricio Lemús
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content className='center'>
            <Icon name='github' />{" "}
            <a
              target='_blank'
              href='https://github.com/JMauricio22'
              rel='noreferrer'
            >
              Github profile
            </a>{" "}
            -{" "}
            <a
              target='_blank'
              rel='noreferrer'
              href='https://github.com/JMauricio22'
            >
              Github repository
            </a>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content className='center'>
            Illustration by{" "}
            <a href='https://icons8.com/illustrations/author/5bf673a26205ee0017636674'>
              Anna Golde
            </a>{" "}
            from <a href='https://icons8.com/illustrations'>Ouch!</a>
          </List.Content>
        </List.Item>
      </List>
    </Segment>
  );
};

export default Footer;
