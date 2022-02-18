import React from "react";
import { Segment, Form, Header } from "semantic-ui-react";

interface FormTodoProps {
  form: {
    userId: string;
    title: string;
  };
  isEdit: boolean;
  onSubmit(): Promise<void>;
  onChangeForm(event: React.ChangeEvent<HTMLInputElement>): void;
  isValid(): boolean;
}

const FormTodo = ({
  form,
  onSubmit,
  onChangeForm,
  isValid,
  isEdit,
}: FormTodoProps) => {
  return (
    <Segment raised className='todo-form-container' color='blue'>
      <Header textAlign='center'>{isEdit ? "EDIT TODO" : "ADD TODO"}</Header>
      <Form onSubmit={onSubmit}>
        <Form.Input
          type='number'
          step='1'
          min='1'
          disabled={isEdit}
          placeholder='User ID'
          value={form.userId}
          name='userId'
          onChange={onChangeForm}
        />
        <Form.Input
          placeholder='Title'
          value={form.title}
          name='title'
          onChange={onChangeForm}
        />
        <Form.Button fluid type='submit' color='facebook' disabled={isValid()}>
          {isEdit ? "UPDATE TODO" : "CREATE TODO"}
        </Form.Button>
      </Form>
    </Segment>
  );
};

export default FormTodo;
