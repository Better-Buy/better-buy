//setting up our middleware.
const express = require("express")
const { ApolloServer } = require("apollo-server-express")
const path = require("path")
const cors = require("cors")
require("dotenv").config({
  path: path.resolve(process.cwd(), "client", ".env.development"),
  debug: true,
})

//calling our resolvers.
const { typeDefs, resolvers } = require("./schemas")
const { authMiddleware } = require("./utils/auth")
const db = require("./config/connection")

//declaring our port number.
const PORT = process.env.PORT || 3001
const app = express()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
})

server.applyMiddleware({ app })

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static("public"))

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}

app.use(cors(corsOptions))

// Serve up static assets, if applicable.
/*
app.use('/images', express.static(path.join(__dirname, '../client/images')));

*/
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")))
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"))
})

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`)
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)
  })
})
