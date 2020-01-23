const { GraphQLInt, GraphQLString, GraphQLObjectType, GraphQLList, GraphQLSchema } = require('graphql');
const Budget = require('../models/Budget');
const Category = require('../models/Category');
const Transaction = require('../models/Transaction');

const CategoryType = new GraphQLObjectType({
  name: 'Category',
  fields: {
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    createdAt: { type: GraphQLString }
  }
});

const BudgetType = new GraphQLObjectType({
  name: 'Budget',
  fields: {
    _id: { type: GraphQLString },
    amount: { type: GraphQLString },
    category: { type: CategoryType },
    year: { type: GraphQLInt },
    month: { type: GraphQLInt },
    day: { type: GraphQLInt },
    createdAt: { type: GraphQLString }
  }
});

const TransactionType = new GraphQLObjectType({
  name: 'Transaction',
  fields: {
    _id: { type: GraphQLString },
    description: { type: GraphQLString },
    amount: { type: GraphQLInt },
    category: { type: CategoryType },
    year: { type: GraphQLInt },
    month: { type: GraphQLInt },
    day: { type: GraphQLInt },
    createdAt: { type: GraphQLString }
  }
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      budgets: {
        type: GraphQLList(BudgetType),
        args: {
          year: { type: GraphQLInt },
          month: { type: GraphQLInt },
          day: { type: GraphQLInt }
        },
        resolve: (root, args) => {
          return Budget.find(args).populate('category').exec()
        }
      },
      transactions: {
        type: GraphQLList(TransactionType),
        args: {
          year: { type: GraphQLInt },
          month: { type: GraphQLInt },
          day: { type: GraphQLInt }
        },
        resolve: (root, args) => {
          return Transaction.find(args).populate('category').exec()
        }
      },
      categories: {
        type: GraphQLList(CategoryType),
        resolve: (root, args) => {
          return Category.find().exec()
        }
      }
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      createCategory: {
        type: CategoryType,
        args: {
          title: { type: GraphQLString }
        },
        resolve: (root, args) => {
          const category = new Category(args);
          return category.save(args)
        }
      }
    }
  })
});

module.exports = schema;