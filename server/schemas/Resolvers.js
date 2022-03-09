const { AuthenticationError, UserInputError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate('books');
          },
        user: async (parent, { username }) => {
          return User.findOne({ username }).populate('books');
        },
        books: async () => {
          return Book.findOne({ bookId });
        },
        book: async () => {
          return Book.find();
        }
      },
      Mutation: {
        createUser: async (parent, args) => {
          try { 
            // Create new user
            const user = await User.create(args);
            // Create token 
            return { user, token: "fake_token" }
            // Return { token, user } or throw error
          } catch (err) {
            console.log(err);
            throw UserInputError("username and email must be unique");
          }
      },
      saveBook: async (parent, args) => {
        try {
          
        } catch (err) {

        }
      },
    }
}


module.exports = resolvers;