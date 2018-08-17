//demo dataa...
const books = [{
        name: 'Lord of the rings 1',
        genre: 'Fantasy',
        id: '1'
    },
    {
        name: 'Lord of the rings 2',
        genre: 'Fantasy',
        id: '2'
    },
    {
        name: 'Lord of the rings 3',
        genre: 'Thriller',
        id: '3'
    }
]

const graphql = require("graphql")
const _ = require('lodash')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID
} = graphql

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        genre: {
            type: GraphQLString
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                //get data from db
                return _.find(books, {
                    id: args.id
                })
            }

        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})