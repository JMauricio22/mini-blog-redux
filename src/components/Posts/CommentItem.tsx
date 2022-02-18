import React from "react";
import { Comment } from "semantic-ui-react";
import { Comment as CommentType } from "../../interfaces/comment.model";

interface CommentItemProps {
  comment: CommentType;
}

const CommentItem = ({ comment }: CommentItemProps) => {
  return (
    <Comment>
      <Comment.Avatar
        src={`https://avatars.dicebear.com/api/avataaars/${comment.name}.svg`}
      />
      <Comment.Content>
        <Comment.Author as='a'>{comment.email}</Comment.Author>
        <Comment.Metadata>
          <div>Today at 5:42PM</div>
        </Comment.Metadata>
        <Comment.Text>{comment.body}</Comment.Text>
      </Comment.Content>
    </Comment>
  );
};

export default CommentItem;
