// Requiring necessary NPM modules:
const express = require("express");
const { Translate } = require("@google-cloud/translate").v2; // Imports the Google Cloud client library

// Configure App:
const app = express();
const port = process.env.PORT || 5000;
const projectId = "node-translation-api";
const translate = new Translate({projectId}); // Instantiates a client

// Set Middlewares:
app.use(express.json());
app.use(express.urlencoded({extended: true}));


async function quickStart() {
  const text = "Good Night"; // The text to translate  
  const target = "de"; // The target language
  // Translates some text into the target language
  const [translation] = await translate.translate(text, target);
  return {text, translation};
}

quickStart()
  .then(result => console.log(result))
  .catch(err => console.log(err));

// Set API endpoints:

// Handle 'GET' requests made on the '/' route:
app.get('/', (req, res) => {  
  res.json({text: "Welcome to Node Translation API"})
});


// Set listener:
app.listen(port, () => {
  console.log(`Server started running on port ${port}`);
})