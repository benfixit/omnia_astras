const { GraphQLList, GraphQLSchema, GraphQLString, GraphQLObjectType } = require('graphql');
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
    status: { type: StatusType },
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
      }
    }
  })
});

module.exports = schema;