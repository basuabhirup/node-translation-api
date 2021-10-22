# Translation API with NodeJS

## Objective of the Project:
- To create a web server with a RESTful API to translate a text from one language to another, using `Google Cloud Translation` API
- The source and target language should be definable via the API
- To cache translations, in order to avoid repeated hits to the API
- To implement smart pre-caching

## How to Use and Test this Server ?
1. Clone this repository into your local device.
2. Go to the project directory and run `npm install` command from your terminal.
3. Run `export GOOGLE_APPLICATION_CREDENTIALS="/home/user/Downloads/node-translation-api-6b2091d0fe30.json"` command after giving it the proper file path to the `node-translation-api-6b2091d0fe30.json` file, which will be provided to you separately via e-mail.
4. Start the server with `node server.js` command.
5. Listen to `localhost:5000` port to check whether the server is properly running or not.
6. Submit POST request to the `localhost:5000/translate` endpoint. The request must contain a 'text' field and a 'target' field in its body in `x-www-form-urlencoded` format. The Google Cloud Translation API behind the scenes is smart enough to detect the source language. You must mention [ISO-639-1 Code of the 'target' language](https://cloud.google.com/translate/docs/languages) (Reference: https://cloud.google.com/translate/docs/languages) to specificy the language into which you want to translate your text.
