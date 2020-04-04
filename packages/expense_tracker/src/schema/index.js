const { GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLString, GraphQLObjectType, GraphQLList, GraphQLSchema } = require('graphql');
const Expense = require('../models/Expense');
const Category = require('../models/Category');
const Income = require('../models/Income');
const Saving = require('../models/Saving');
const Note = require('../models/Note');
const Charge = require('../models/Charge');
const ChargeTypeModel = require('../models/ChargeType');

const CategoryType = new GraphQLObjectType({
  name: 'Category',
  fields: {
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    createdAt: { type: GraphQLString }
  }
});

const ChargeTypeModelType = new GraphQLObjectType({
  name: 'ChargeType',
  fields: {
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    createdAt: { type: GraphQLString }
  }
});

const ExpenseType = new GraphQLObjectType({
  name: 'Expense',
  fields: {
    _id: { type: GraphQLString },
    description: { type: GraphQLString },
    budget: { type: GraphQLInt },
    actual: { type: GraphQLInt },
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

const SavingType = new GraphQLObjectType({
  name: 'Saving',
  fields: {
    _id: { type: GraphQLString },
    description: { type: GraphQLString },
    amount: { type: GraphQLInt },
    actual: { type: GraphQLInt },
    year: { type: GraphQLInt },
    month: { type: GraphQLInt },
    day: { type: GraphQLInt },
    createdAt: { type: GraphQLString }
  }
});

const NoteType = new GraphQLObjectType({
  name: 'Note',
  fields: {
    _id: { type: GraphQLString },
    description: { type: GraphQLString },
    createdAt: { type: GraphQLString }
  }
});

const ChargeType = new GraphQLObjectType({
  name: 'Charge',
  fields: {
    _id: { type: GraphQLString },
    description: { type: GraphQLString },
    amount: { type: GraphQLInt },
    type: { type: ChargeTypeModelType },
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
      expense: {
        type: ExpenseType,
        args: {
          _id: { type: GraphQLNonNull(GraphQLID) }
        },
        resolve: (root, args) => {
          return Expense.findOne(args).populate('category').exec()
        }
      },
      expenses: {
        type: GraphQLList(ExpenseType),
        args: {
          year: { type: GraphQLInt },
          month: { type: GraphQLInt },
          day: { type: GraphQLInt }
        },
        resolve: (root, args) => {
          return Expense.find(args).populate('category').exec()
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
      saving: {
        type: SavingType,
        args: {
          _id: { type: GraphQLNonNull(GraphQLID) }
        },
        resolve: (root, args) => {
          return Saving.findOne(args).populate('type').exec()
        }
      },
      savings: {
        type: GraphQLList(SavingType),
        args: {
          year: { type: GraphQLInt },
          month: { type: GraphQLInt },
          day: { type: GraphQLInt }
        },
        resolve: (root, args) => {
          return Saving.find(args).populate('type').exec()
        }
      },
      categories: {
        type: GraphQLList(CategoryType),
        resolve: (root, args) => {
          return Category.find().exec()
        }
      },
      chargeTypes: {
        type: GraphQLList(ChargeTypeModelType),
        resolve: (root, args) => {
          return ChargeTypeModel.find().exec()
        }
      },
      note: {
        type: NoteType,
        args: {
          _id: { type: GraphQLNonNull(GraphQLID) }
        },
        resolve: (root, args) => {
          return Note.findOne(args).exec()
        }
      },
      notes: {
        type: GraphQLList(NoteType),
        resolve: (root, args) => {
          return Note.find().exec()
        }
      },
      charge: {
        type: ChargeType,
        args: {
          _id: { type: GraphQLNonNull(GraphQLID) }
        },
        resolve: (root, args) => {
          return Charge.findOne(args).exec()
        }
      },
      charges: {
        type: GraphQLList(ChargeType),
        args: {
          year: { type: GraphQLInt },
          month: { type: GraphQLInt },
          day: { type: GraphQLInt }
        },
        resolve: (root, args) => {
          return Charge.find().exec()
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
      createChargeType: {
        type: ChargeTypeModelType,
        args: {
          title: { type: GraphQLString }
        },
        resolve: (root, args) => {
          const chargeType = new ChargeTypeModel(args);
          return chargeType.save(function (err) {
            if (err) return { code: 400, message: 'Charge Type could not be saved.' };
            return { code: 200, message: 'Charge Type saved.' };
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
      createSaving: {
        type: SavingType,
        args: {
          description: { type: GraphQLString },
          amount: { type: GraphQLInt },
          actual: { type: GraphQLInt },
          year: { type: GraphQLInt },
          month: { type: GraphQLInt },
          day: { type: GraphQLInt }
        },
        resolve: (root, args) => {
          const saving = new Saving(args);
          return saving.save(function (err) {
            if (err) return { code: 400, message: 'Saving could not be saved.' };
            return { code: 200, message: 'Saving saved.' };
          });
        }
      },
      createExpense: {
        type: ExpenseType,
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
          const expense = new Expense(args);
          return expense.save(function (err) {
            if (err) return { code: 400, message: 'Expense could not be saved.' };
            return { code: 200, message: 'Expense saved.' };
          });
        }
      },
      createNote: {
        type: NoteType,
        args: {
          description: { type: GraphQLString }
        },
        resolve: (root, args) => {
          const note = new Note(args);
          return note.save(function (err) {
            if (err) return { code: 400, message: 'Note could not be saved.' };
            return { code: 200, message: 'Note saved.' };
          });
        }
      },
      createCharge: {
        type: ChargeType,
        args: {
          description: { type: GraphQLString },
          amount: { type: GraphQLInt },
          type: { type: GraphQLNonNull(GraphQLID) },
          year: { type: GraphQLInt },
          month: { type: GraphQLInt },
          day: { type: GraphQLInt }
        },
        resolve: (root, args) => {
          const charge = new Charge(args);
          return charge.save(function (err) {
            if (err) return { code: 400, message: 'Charge could not be saved.' };
            return { code: 200, message: 'Charge saved.' };
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
      editSaving: {
        type: SavingType,
        args: {
          _id: { type: GraphQLNonNull(GraphQLID) },
          description: { type: GraphQLString },
          amount: { type: GraphQLInt },
          actual: { type: GraphQLInt },
          year: { type: GraphQLInt },
          month: { type: GraphQLInt },
          day: { type: GraphQLInt }
        },
        resolve: (root, args) => {
          const { _id, ...rest } = args;
          console.log(args)
          return Saving.findOneAndUpdate({_id: args._id}, rest, { new: true, useFindAndModify: false }, function (error, saving) {
            if (error) return { code: 400, message: 'Saving could not be updated.' };
            return saving
          });
        }
      },
      editExpense: {
        type: ExpenseType,
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
          return Expense.findOneAndUpdate({_id: args._id}, rest, { new: true }, function (error, expense) {
            if (error) return { code: 400, message: 'Expense could not be updated.' };
            return expense
          }).populate('category').exec();
        }
      },
      editCharge: {
        type: ChargeType,
        args: {
          _id: { type: GraphQLNonNull(GraphQLID) },
          description: { type: GraphQLString },
          amount: { type: GraphQLInt },
          type: { type: GraphQLID },
          year: { type: GraphQLInt },
          month: { type: GraphQLInt },
          day: { type: GraphQLInt }
        },
        resolve: (root, args) => {
          const { _id, ...rest } = args;
          return Charge.findOneAndUpdate({_id: args._id}, rest, { new: true }, function (error, note) {
            if (error) return { code: 400, message: 'Charge could not be updated.' };
            return charge
          }).exec();
        }
      },
      editNote: {
        type: NoteType,
        args: {
          _id: { type: GraphQLNonNull(GraphQLID) },
          description: { type: GraphQLString }
        },
        resolve: (root, args) => {
          const { _id, ...rest } = args;
          return Note.findOneAndUpdate({_id: args._id}, rest, { new: true }, function (error, note) {
            if (error) return { code: 400, message: 'Note could not be updated.' };
            return note
          }).exec();
        }
      },
      deleteExpense: {
        type: ExpenseType,
        args: {
          _id: { type: GraphQLNonNull(GraphQLID) }
        },
        resolve: (root, args) => {
          return Expense.deleteOne({_id: args._id}, function (err) {
            if (err) return { code: 400, message: 'Expense could not be deleted.' };
          });
        }
      }
    }
  })
});

module.exports = schema;