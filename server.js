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


async function quickStart(text, target) {
  // Translates some text into the target language
  const [translation] = await translate.translate(text, target);
  return {text, translation};
}



// Set API endpoints:

// Handle 'GET' requests made on the '/' route:
app.get('/', (req, res) => {  
  res
  .status(200)
  .json({
    title: "Welcome to Node Translation API",
    description: "Use the '/translate' route to translate any text."
  })
});

// Handle 'POST' requests made on the '/translate' route:
app.post('/translate', (req, res) => {
  const text = req.body.text // "Good Night"; // The text to translate  
  const target = req.body.target // "de"; // The target language
  quickStart(text, target)
  .then(result => res.status(200).json(result))
  .catch(err => res.status(400).json(err))
});



// Set listener:
app.listen(port, () => {
  console.log(`Server started running on port ${port}`);
})