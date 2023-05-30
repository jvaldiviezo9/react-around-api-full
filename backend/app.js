const express = require('express');
const { port = 3000 } = process.env;
const mongoose = require('mongoose');
const app = express();

const auth = require('./middleware/auth');

const {login, createUser} = require('./controllers/users');

const UsersRouter = require('./routes/users');
const CardsRouter = require('./routes/cards');


// Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);
app.use('/users', UsersRouter);
app.use('/cards', CardsRouter);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});


// hola, hice unos cambios en la URL de conexión, y una rutina para
// probar los parametros usados en la plataforma primero y después la versión 6
// Estoy usando MongoDB version 6.0.5, Compass 1.36.4 y mongoose ^7.1.0
async function connectToMongoDB() {

  // Connection options for the latest version of Mongoose
  const latestOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  // Connection options for version 4 of Mongoose
  const version4Options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  };

  let version4Error = null;
  let latestError = null;

  try {
    // Connect to MongoDB using version 4 of Mongoose
    await mongoose.connect('mongodb://0.0.0.0:27017/aroundb', version4Options);
    console.log("Connected to MongoDB with version 4");
  } catch (err) {
    version4Error = err;
  }

  try {
    // Connect to MongoDB using the latest version of Mongoose
    await mongoose.connect('mongodb://0.0.0.0:27017/aroundb', latestOptions);
    console.log("Connected to MongoDB with the latest version");
  } catch (err) {
    latestError = err;
  }

  if (version4Error && latestError) {
    console.error("Both connection attempts failed:");
    console.error("Error connecting with version 4:", version4Error);
    console.error("Error connecting with the latest version:", latestError);
    console.log("Unable to connect to MongoDB.");
  }
}

// Call the function to initiate the connection
connectToMongoDB();