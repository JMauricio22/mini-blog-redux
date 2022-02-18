import React from "react";
import { connect } from "react-redux";
import { Item } from "semantic-ui-react";
import { Post } from "../../interfaces/post.model";
import { State } from "../../actions/types";
import PostItem from "./PostItem";
import { togglePostComments } from "../../actions/postsActions";
import { getComments } from "../../actions/commentsActions";

interface PostListProps {
  userId: number;
  posts?: Post[];
  togglePostComments?(userIndex: number, postIndex: number): void;
  getComments?(postId: number): void;
}

const PostList = ({
  userId,
  posts,
  togglePostComments,
  getComments,
}: PostListProps) => {
  const handleTogglComments = (postId, postIndex) => {
    if (togglePostComments && getComments) {
      togglePostComments(userId, postIndex);
      getComments(postId);
    }
  };

  return (
    <Item.Group divided>
      {posts?.map((post: Post, postIndex: number) => (
        <PostItem
          key={post.id}
          post={post}
          toggleComments={() => handleTogglComments(post.id, postIndex)}
        />
      ))}
    </Item.Group>
  );
};

const mapStateToProps = (state: State, { userId }: PostListProps) => {
  return {
    posts: state.postsReducer.posts[userId],
  };
};

const mapDispatchToProps = {
  togglePostComments,
  getComments,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
