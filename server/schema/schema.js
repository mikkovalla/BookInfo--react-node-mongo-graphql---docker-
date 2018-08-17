//demo dataa...
const books = [{
        name: 'Lord of the rings 1',
        genre: 'Fantasy',
        id: '1',
        authorId: '1'
    },
    {
        name: 'Lord of the rings 2',
        genre: 'Fantasy',
        id: '2',
        authorId: '2'
    },
    {
        name: 'Lord of the rings 3',
        genre: 'Thriller',
        id: '3',
        authorId: '3'
    },
    {
        name: 'Lord of the rings 5',
        genre: 'Thriller',
        id: '4',
        authorId: '3'
    },
    {
        name: 'Lord of the rings 7',
        genre: 'Thriller',
        id: '5',
        authorId: '1'
    },
    {
        name: 'Lord of the rings 0',
        genre: 'Thriller',
        id: '6',
        authorId: '1'
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
    GraphQLInt,
    GraphQLList
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
        },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                //console.log(parent)
                return _.find(authors, {
                    id: parent.authorId
                })
            }
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
        },
        books: {
            type: GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(books, {
                    authorId: parent.id
                })
            }
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