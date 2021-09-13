import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $password: String!, $email: String!) {
    addUser(username: $username, password: $password, email: $email) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;
export const Add_Book = gql`
  mutation addBook($bookData: bookInput!) {
    addBook(BookData: $bookData) {
      _id
      email
      username
      savedBooks {
        _id
        bookId
        authors
        description
        image
        link
        title
      }
      bookCount
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation deleteBook($bookId: String!) {
    deleteBook(bookId: $bookId) {
      _id
      email
      username
      savedBooks {
        _id
        bookId
        authors
        description
        image
        link
        title
      }
      bookCount
    }
  }
`;

export const LOGIN = gql`
mutation login ($email:String!, $password: String!){
    login(email:$email, password:$password){
      token
      user{
        _id
        email
        username
      }
    }
  }
`;
