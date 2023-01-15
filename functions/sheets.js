const _ = require("lodash");
//googleapis
const { google } = require("googleapis");

const authCache = {
  auth: null,
  sheets: null,
};

const getSheetsClient = async () => {
  if (!authCache.auth) {
    authCache.auth = new google.auth.GoogleAuth({
      keyFile: "keys.json", //the key file
      //url to spreadsheets API
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
    authCache.sheets = google.sheets({
      version: "v4",
      auth: await authCache.auth.getClient(),
    });
  }
  return { ...authCache };
};

const NOOP_LOGGER = () => {};

const readWords = async (spreadsheetId, sheetName, options = {}) => {
  const { log = NOOP_LOGGER } = options;
  const { auth, sheets } = await getSheetsClient();
  // TODO: auth is null here :(
  let range = `${sheetName}!A1:Z1`;
  log({ range, spreadsheetId, sheetName, auth: !!auth });
  let res = await sheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range,
  });
  const titles = _.get(res, "data.values[0]", []);
  if (titles.length > 0) {
    const endCol = COLS.charAt(titles.length - 1);
    range = `${sheetName}!A2:${endCol}`;
    log(range);
    res = await sheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range,
    });
    const rawData = _.get(res, "data.values");
    const data = Array(titles.length)
      .fill(null)
      .map(() => []);
    log(JSON.stringify({ titles, data, rawData }, null, 2));
    for (const row of rawData) {
      for (let i = 0; i < row.length; i++) {
        if (!!row[i]) {
          data[i].push(row[i]);
        }
      }
    }
    // TODO: transpose data
    const lists = titles
      .map((title, i) => ({
        id: COLS.charAt(i),
        title,
        words: data[i],
      }))
      .filter(({ title }) => !!title);
    log(lists);
    return lists;
  }
};

const COLS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

module.exports = { readWords };
