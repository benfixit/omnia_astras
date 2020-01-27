const { GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLString, GraphQLObjectType, GraphQLList, GraphQLSchema } = require('graphql');
const Budget = require('../models/Budget');
const Category = require('../models/Category');
const Income = require('../models/Income');

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
    description: { type: GraphQLString },
    budget: { type: GraphQLString },
    actual: { type: GraphQLString },
    category: { type: CategoryType },
    year: { type: GraphQLInt },
    month: { type: GraphQLInt },
    day: { type: GraphQLInt },
    createdAt: { type: GraphQLString }
  }
});

const IncomeType = new GraphQLObjectType({
  name: 'Income',
  fields: {
    _id: { type: GraphQLString },
    description: { type: GraphQLString },
    amount: { type: GraphQLInt },
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
      budget: {
        type: BudgetType,
        args: {
          _id: { type: GraphQLNonNull(GraphQLID) }
        },
        resolve: (root, args) => {
          return Budget.findOne(args).populate('category').exec()
        }
      },
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
      income: {
        type: IncomeType,
        args: {
          _id: { type: GraphQLNonNull(GraphQLID) }
        },
        resolve: (root, args) => {
          return Income.findOne(args).exec()
        }
      },
      incomes: {
        type: GraphQLList(IncomeType),
        args: {
          year: { type: GraphQLInt },
          month: { type: GraphQLInt },
          day: { type: GraphQLInt }
        },
        resolve: (root, args) => {
          return Income.find(args).exec()
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
      createIncome: {
        type: IncomeType,
        args: {
          description: { type: GraphQLString },
          amount: { type: GraphQLInt },
          year: { type: GraphQLInt },
          month: { type: GraphQLInt },
          day: { type: GraphQLInt }
        },
        resolve: (root, args) => {
          const income = new Income(args);
          return income.save(function (err) {
            if (err) return { code: 400, message: 'Income could not be saved.' };
            return { code: 200, message: 'Income saved.' };
          });
        }
      },
      createBudget: {
        type: BudgetType,
        args: {
          description: { type: GraphQLString },
          budget: { type: GraphQLInt },
          actual: { type: GraphQLInt },
          category: { type: GraphQLNonNull(GraphQLID) },
          year: { type: GraphQLInt },
          month: { type: GraphQLInt },
          day: { type: GraphQLInt }
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
      editIncome: {
        type: IncomeType,
        args: {
          _id: { type: GraphQLNonNull(GraphQLID) },
          description: { type: GraphQLString },
          amount: { type: GraphQLInt },
          year: { type: GraphQLInt },
          month: { type: GraphQLInt },
          day: { type: GraphQLInt }
        },
        resolve: (root, args) => {
          const { _id, ...rest } = args;
          return Income.findOneAndUpdate({_id: args._id}, rest, { new: true, useFindAndModify: false }, function (error, income) {
            if (error) return { code: 400, message: 'Income could not be updated.' };
            return income
          });
        }
      },
      editBudget: {
        type: BudgetType,
        args: {
          _id: { type: GraphQLNonNull(GraphQLID) },
          description: { type: GraphQLString },
          budget: { type: GraphQLInt },
          actual: { type: GraphQLInt },
          year: { type: GraphQLInt },
          month: { type: GraphQLInt },
          day: { type: GraphQLInt },
          category: { type: GraphQLID }
        },
        resolve: (root, args) => {
          const { _id, ...rest } = args;
          return Budget.findOneAndUpdate({_id: args._id}, rest, { new: true }, function (error, budget) {
            if (error) return { code: 400, message: 'Budget could not be updated.' };
            return budget
          }).populate('category').exec();
        }
      }
    }
  })
});

module.exports = schema;