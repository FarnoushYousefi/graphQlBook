const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    _id: ID
    bookId: String
    authors: [String]
    description: String
    image: String
    link: String
    title: String!
  }

  type User {
    _id: ID
    email: String
    username: String!
    savedBooks: [Book]
    bookCount: Int
  }
  input bookInput {
    bookId: String
    authors: [String]
    description: String
    image: String
    link: String
    title: String!
  }
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addBook(BookData: bookInput!): User
    deleteBook(bookId:String!):User
  }
`;
module.exports = typeDefs;
