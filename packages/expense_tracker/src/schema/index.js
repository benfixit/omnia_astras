const { GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLString, GraphQLObjectType, GraphQLList, GraphQLSchema } = require('graphql');
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
          return category.save(function (err) {
            if (err) return { code: 400, message: 'Category could not be saved.' };
            return { code: 200, message: 'Category saved.' };
          });
        }
      },
      createTransaction: {
        type: TransactionType,
        args: {
          description: { type: GraphQLString },
          amount: { type: GraphQLInt },
          category: { type: GraphQLNonNull(GraphQLID) }
        },
        resolve: (root, args) => {
          const transaction = new Transaction(args);
          return transaction.save(function (err) {
            if (err) return { code: 400, message: 'Transaction could not be saved.' };
            return { code: 200, message: 'Transaction saved.' };
          });
        }
      },
      createBudget: {
        type: BudgetType,
        args: {
          amount: { type: GraphQLInt },
          category: { type: GraphQLNonNull(GraphQLID) }
        },
        resolve: (root, args) => {
          const budget = new Budget(args);
          return budget.save(function (err) {
            if (err) return { code: 400, message: 'Budget could not be saved.' };
            return { code: 200, message: 'Budget saved.' };
          });
        }
      },
      editCategory: {
        type: CategoryType,
        args: {
          _id: { type: GraphQLNonNull(GraphQLID) },
          title: { type: GraphQLString }
        },
        resolve: (root, args) => {
          return Category.updateOne(args, function (error, res) {
            if (error) return { code: 400, message: 'Category could not be updated.' };
            return { code: 200, message: 'Category saved.' };
          });
        }
      },
      editTransaction: {
        type: TransactionType,
        args: {
          _id: { type: GraphQLNonNull(GraphQLID) },
          description: { type: GraphQLString },
          amount: { type: GraphQLInt },
          year: { type: GraphQLInt },
          month: { type: GraphQLInt },
          day: { type: GraphQLInt },
          category: { type: GraphQLID }
        },
        resolve: (root, args) => {
          return Transaction.updateOne(args, function (error, res) {
            if (error) return { code: 400, message: 'Transaction could not be updated.' };
            return { code: 200, message: 'Transaction saved.' };
          });
        }
      },
      editBudget: {
        type: BudgetType,
        args: {
          _id: { type: GraphQLNonNull(GraphQLID) },
          title: { type: GraphQLString }
        },
        resolve: (root, args) => {
          return Budget.updateOne(args, function (error, res) {
            if (error) return { code: 400, message: 'Budget could not be updated.' };
            return { code: 200, message: 'Budget saved.' };
          });
        }
      }
    }
  })
});

module.exports = schema;