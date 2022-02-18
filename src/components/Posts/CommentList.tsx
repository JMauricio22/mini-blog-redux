import React from "react";
import { connect } from "react-redux";
import { Comment, Message, Placeholder } from "semantic-ui-react";
import { Comment as CommentType } from "../../interfaces/comment.model";
import CommentItem from "./CommentItem";
import { State } from "../../actions/types";

interface CommentListProps {
  postId: number;
  comments?: CommentType[];
  isLoading?: boolean;
  error?: string;
}

const LoadingComments = () => (
  <>
    {[1, 2].map(() => (
      <Placeholder>
        <Placeholder.Header image>
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Header>
      </Placeholder>
    ))}
  </>
);

const CommentList = ({ comments, isLoading, error }: CommentListProps) => {
  const onLoading = () => {
    return isLoading ? <LoadingComments /> : null;
  };

  const onError = () => {
    return error && !isLoading ? (
      <Message error size='mini'>
        {error}
      </Message>
    ) : null;
  };

  const onRender = () => {
    return (
      !isLoading &&
      !error &&
      comments?.map((comment: CommentType) => (
        <CommentItem comment={comment} key={comment.id} />
      ))
    );
  };

  return (
    <Comment.Group>
      {onLoading()}
      {onError()}
      {onRender()}
    </Comment.Group>
  );
};

const mapStateToProps = (state: State, { postId }: CommentListProps) => ({
  comments: state.commentsReducer.comments[postId],
  isLoading: state.commentsReducer.comments_loading[postId],
  error: state.commentsReducer.comments_error[postId],
});

export default connect(mapStateToProps)(CommentList);
