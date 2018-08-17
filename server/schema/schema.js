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

const authors = [{
        name: 'JJ Tolkien',
        age: 70,
        id: '1'
    },
    {
        name: 'JJ Tolkien Jr',
        age: 50,
        id: '2'
    },
    {
        name: 'JJ Tolkien Sr',
        age: 80,
        id: '3'
    }
]

const graphql = require("graphql")
const _ = require('lodash')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt
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

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        age: {
            type: GraphQLInt
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
                //get data from db with lodash
                return _.find(books, {
                    id: args.id
                })
            }

        },
        author: {
            type: AuthorType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return _.find(authors, {
                    id: args.id
                })
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})