import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Header } from "semantic-ui-react";
import * as usersActions from "../../actions/usersActions";
import * as postsActions from "../../actions/postsActions";
import * as commentsActions from "../../actions/commentsActions";
import Spinner from "../Spinner/Spinner";
import Error from "../Error/Error";
import PostList from "./PostList";
import { UserState } from "../../interfaces/user.model";
import { PostState } from "../../interfaces/post.model";
import { State } from "../../actions/types";

const { getAll: getAllUsers } = usersActions;
const { getPostsByUserId } = postsActions;
const { clearPostCommentsError } = commentsActions;

interface PostsProps {
  getAllUsers();
  usersReducer: UserState;
  getPostsByUserId(id: string);
  postsReducer: PostState;
  clearPostCommentsError(): void;
}

const Posts = (props: PostsProps) => {
  const { id } = useParams<{ id: string }>();
  const {
    getAllUsers,
    usersReducer,
    getPostsByUserId,
    postsReducer,
    clearPostCommentsError,
  } = props;

  const componentWillUnmount = () => {
    clearPostCommentsError();
  };

  useEffect(() => {
    return componentWillUnmount;
  }, []);

  useEffect(() => {
    async function fetchAllUsers() {
      if (!Object.values(usersReducer.users).length) {
        await getAllUsers();
      }
    }
    fetchAllUsers();
  }, []);

  useEffect(() => {
    async function fetchPostsByUserId() {
      if (!postsReducer.posts[id]) {
        getPostsByUserId(id);
      }
    }
    fetchPostsByUserId();
  }, []);

  const onLoading = () => <Spinner />;
  const onError = () => <Error message={postsReducer.error} />;
  const onRender = () => (
    <>
      <Header as='h1' textAlign='center' className='mb-3'>
        <u>{usersReducer.users[id].name}'s publications</u>
      </Header>
      <PostList userId={Number.parseInt(id)} />
    </>
  );

  return (
    <>
      {postsReducer.loading && onLoading()}
      {!postsReducer.loading && postsReducer.error && onError()}
      {usersReducer.users[id] &&
        postsReducer.posts[id] &&
        !postsReducer.error &&
        !postsReducer.loading &&
        onRender()}
    </>
  );
};

const maptStateToProps = ({ usersReducer, postsReducer }: State) => ({
  usersReducer,
  postsReducer,
});

const mapDispatchToProps = {
  getAllUsers,
  getPostsByUserId,
  clearPostCommentsError,
};

export default connect(maptStateToProps, mapDispatchToProps)(Posts);
