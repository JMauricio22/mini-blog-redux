import React, { useState } from "react";
import { Item } from "semantic-ui-react";
import { Post } from "../../interfaces/post.model";
import { Accordion, Icon } from "semantic-ui-react";
import CommentList from "./CommentList";

interface PostItemProps {
  post: Post;
  toggleComments(): void;
}

const PostItem = ({ post, toggleComments }: PostItemProps) => {
  const [showComments, setShowComments] = useState(false);

  const toggleCommentsAccordion = () => {
    setShowComments(!showComments);
    toggleComments();
  };

  return (
    <Item>
      <Item.Image
        size='small'
        src='https://react.semantic-ui.com/images/wireframe/image.png'
      />

      <Item.Content>
        <Item.Header>{post.title}</Item.Header>
        <Item.Description>
          <p>{post.body}</p>
        </Item.Description>
        <Item.Extra>
          <Accordion fluid>
            <Accordion.Title
              active={showComments}
              onClick={toggleCommentsAccordion}
            >
              <Icon name='dropdown' />
              Show comments
            </Accordion.Title>
            <Accordion.Content active={showComments}>
              <CommentList postId={post.id} />{" "}
            </Accordion.Content>
          </Accordion>
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

export default PostItem;
