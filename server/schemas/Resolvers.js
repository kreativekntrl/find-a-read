const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async (parent, { username }) => {
          return User.findOne({ username });
        },
      },
    
    }


module.exports = resolvers;