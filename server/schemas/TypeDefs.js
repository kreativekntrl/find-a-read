const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Query {
  users: [User]
  user(username: String!): User
  books: [Book]
  book(bookId: String!): Book
  me: User
}

type Auth {
  token: ID!
  user: User
}

type Mutation {
  createUser(username: String!, email: String!, password: String!): Auth!
  login(email: String!, password: String!): Auth
  saveBook(authors: [String], description: String!, title: String!, bookId: String!, image: String, link: String): User
  removeBook(bookId: String!): User!
}

type User {
    _id: ID!
    username: String!
    email: String!
    savedBooks: [Book]
}

type Book {
    _id: ID!
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
}
  
`;

module.exports = typeDefs;