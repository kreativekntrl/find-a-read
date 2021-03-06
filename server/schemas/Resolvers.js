const {
  AuthenticationError,
  UserInputError
} = require('apollo-server-express');
const {
  User
} = require('../models');
const {
  signToken
} = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
    },
  },
  Mutation: {
    createUser: async (parent, args) => {
      try {
        // Create new user
        const user = await User.create(args);
        const token = signToken(user);
        // Create token 
        return {
          token,
          user
        }
        // Return { token, user } or throw error
      } catch (err) {
        console.log(err);
        throw UserInputError("username and email must be unique");
      }
    },
    login: async (parent, {
      email,
      password
    }) => {
      const user = await User.findOne({
        email
      });

      if (!user) {
        throw new AuthenticationError('No user found with this email address or password');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return {
        token,
        user
      };
    },
    saveBook: async (parent, {
      title,
      description,
      bookId,
      authors,
      link,
      image
    }, context) => {
      try {
        if (context.user) {
          const updatedUser = await User.findByIdAndUpdate({
            id: context.user._id
          }, {
            $push: {
              savedBooks: {
                title,
                description,
                bookId,
                authors,
                link,
                image
              }
            }
          }, {
            new: true,
            runValidators: true
          });
          return updatedUser;
        }
      } catch (err) {
        console.log(err);
        throw new AuthenticationError('you are not logged in');
      }
    },
    removeBook: async (parent, {
      bookId
    }, context) => {
      const updatedUser = await User.findByIdAndUpdate({
        id: context.user._id
      }, {
        $pull: {
          savedBooks: {
            bookId
          }
        }
      }, {
        new: true
      }, );
      return updatedUser;
    }
  }
}


module.exports = resolvers;