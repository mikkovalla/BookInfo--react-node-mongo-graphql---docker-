const express = require('express')
const graphqlHTTP = require("express-graphql")
const schema = require("./schema/schema")
const mongoose = require("mongoose")

const app = express()

mongoose.connect('mongodb://mikko:testi123@ds125392.mlab.com:25392/mikko_bookinfo_db', { useNewUrlParser: true })
mongoose.connection.once('open', () => {
    console.log('connected to db!')
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(4000, () => {
    console.log("running on port 4k!")
})