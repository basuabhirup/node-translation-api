// Requiring necessary NPM modules:
const express = require("express");
const { Translate } = require("@google-cloud/translate").v2; // Imports the Google Cloud client library
const NodeCache = require( "node-cache" );

// Configure App:
const app = express();
const port = process.env.PORT || 5000;
const projectId = "node-translation-api";
const translate = new Translate({projectId}); // Instantiates a client
const myCache = new NodeCache();

// Set Middlewares:
app.use(express.json());
app.use(express.urlencoded({extended: true}));


async function quickTranslate(text, target) {
  // Translates some text into the target language
  const [translation] = await translate.translate(text, target);
  return {text, target, translation};
}



// Set API endpoints:

// Handle 'GET' requests made on the '/' route:
app.get('/', (req, res) => {  
  res
  .status(200)
  .json({
    title: "Welcome to Node Translation API",
    description: "Submit a POST request on the '/translate' route. The request must contain a 'text' field and a 'target' field in its body. The Google Cloud Translation API behind the scenes is smart enough to detect the language of the submitted text. You must mention ISO-639-1 Code of the 'target' language (Reference: https://cloud.google.com/translate/docs/languages) to specifically mention the language into which you want to translate the submitted text."
  })
});

// Handle 'POST' requests made on the '/translate' route:
app.post('/translate', (req, res) => {
  const text = req.body.text // The text to translate  
  const target = req.body.target // The target language
  if (myCache.has("translation") && myCache.get("translation")["text"] === text && myCache.get("translation")["target"] === target) {
    console.log("getting data from cache");
    return res.status(200).json(myCache.get("translation"));
  }
  quickTranslate(text, target)
  .then(result => {
    myCache.set("translation", result)
    console.log("getting data from API");
    res.status(200).json(result)
  })
  .catch(err => res.status(400).json(err))
});



// Set listener:
app.listen(port, () => {
  console.log(`Server started running on port ${port}`);
})