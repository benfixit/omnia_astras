const { GraphQLBoolean, GraphQLList, GraphQLSchema, GraphQLString, GraphQLObjectType } = require('graphql');
const Comment = require('../models/Comment');
const Objective = require('../models/Objective');
const Status = require('../models/Status');
const KeyResult = require('../models/KeyResult');

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
    dueDate: { type: GraphQLString },
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

const KeyResultType = new GraphQLObjectType({
  name: 'KeyResult',
  fields: {
    _id: { type: GraphQLString },
    description: { type: GraphQLString },
    objective: { type: ObjectiveType },
    done: { type: GraphQLBoolean },
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
          return Objective.find().populate('status').exec();
        }
      },
      comments: {
        type: GraphQLList(CommentType),
        resolve: () => {
          return Comment.find().populate('objective').exec()
        }
      },
      keyResults: {
        type: GraphQLList(KeyResultType),
        resolve: () => {
          return KeyResult.find().populate('objective').exec()
        }
      }
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    createObjective: {
      type: ObjectiveType,
      args: {
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: StatusType },
        dueDate: { type: GraphQLString }
      },
      resolve: (root, args) => {
        const objective = Objective(args);
        return objective.save(function (err) {
          if (err) return { code: 400, message: 'Objective could not be saved.' };
          return { code: 200, message: 'Objective saved.' };
        });
      }
    }
  })
});

module.exports = schema;