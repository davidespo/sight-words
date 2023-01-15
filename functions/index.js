const _ = require("lodash");
const functions = require("firebase-functions");
const { readWords } = require("./sheets");
const { firebase } = require("googleapis/build/src/apis/firebase");

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started

const cors = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "*");

  if (req.method === "OPTIONS") {
    functions.logger.info("handling options request");
    res.status(204).send("");
    return true;
  }
  return false;
};
exports.words = functions.https.onRequest(async (req, res) => {
  if (cors(req, res)) return;
  functions.logger.info("HERE");
  if (req.method !== "POST" || !_.isPlainObject(req.body)) {
    functions.logger.error(
      `must be POST with valid body but got METHOD=${req.method}`
    );
    res.status(400).json({ error: "must be POST with valid body" });
    return;
  }
  const { sheetId, sheetName = "words" } = req.body;
  if (!sheetId) {
    functions.logger.error("missing sheet id");
    res.status(400).json({ error: "missing sheet id" });
    return;
  }
  try {
    const lists = await readWords(sheetId, sheetName, {
      log: functions.logger.info,
    });
    res.status(200).json(lists);
  } catch (error) {
    functions.logger.error(error);
    res.status(500).json({ error: error.message });
  }
});
