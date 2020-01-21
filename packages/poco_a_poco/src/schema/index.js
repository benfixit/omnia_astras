const { GraphQLList, GraphQLSchema, GraphQLString, GraphQLObjectType } = require('graphql');
const Comment = require('../models/Comment');
const Objective = require('../models/Objective');
const Status = require('../models/Status');

const StatusType = new GraphQLObjectType({
  name: 'Status',
  fields: {
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    createdAt: { type: GraphQLString }
  }
});

const ObjectiveType = new GraphQLObjectType({
  name: 'Objective',
  fields: {
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: StatusType },
    createdAt: { type: GraphQLString }
  }
});

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: {
    _id: { type: GraphQLString },
    body: { type: GraphQLString },
    objective: { type: ObjectiveType },
    createdAt: { type: GraphQLString }
  }
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      statuses: {
        type: GraphQLList(StatusType),
        resolve: () => {
          return Status.find().exec();
        }
      },
      objectives: {
        type: GraphQLList(ObjectiveType),
        resolve: () => {
          return Objective.find().exec();
        }
      },
      comments: {
        type: GraphQLList(CommentType),
        resolve: () => {
          return Comment.find().exec()
        }
      }
    }
  })
});

module.exports = schema;