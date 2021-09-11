const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers={
    Query:{
      users: async () => {
        return User.find()
          .select('-__v -password')
        
      },
      user: async (parent, { username }) => {
        return User.findOne({ username })
          .select('-__v -password')
          
      }
    },
    Mutation:{
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
      
            return { token, user };
          },
          login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const token = signToken(user);
            return { token, user };
          },
          
          addBook: async(parent,{BookData},context)=>{
              if(context.user){
                  const book = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedBooks: BookData} },
                    { new: true }
                  );
                  return book;
              }
              throw new AuthenticationError('You need to be logged in!');
          }

    }
}
module.exports=resolvers;