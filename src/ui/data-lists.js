import axios from "axios";
import { atom, useAtom } from "jotai";
import DEFAULT_GLOBE_LISTS from "./data-globe.json";

const DEFAULT_SHEET_ID = "1ePibAnYJuyS4mKtBFTqi_O-_rXjiKjeHonBPTASBkgo";
const DEFAULT_SHEET_NAME = "globe";

const sheetsAtom = atom([
  {
    sheetId: "1ePibAnYJuyS4mKtBFTqi_O-_rXjiKjeHonBPTASBkgo",
    sheetName: "globe",
  },
  {
    sheetId: "1ePibAnYJuyS4mKtBFTqi_O-_rXjiKjeHonBPTASBkgo",
    sheetName: "words",
  },
]);
const loadingAtom = atom(false);
const dataAtom = atom(DEFAULT_GLOBE_LISTS);
const errorAtom = atom(null);
const sheetIdAtom = atom(DEFAULT_SHEET_ID);
const sheetNameAtom = atom(DEFAULT_SHEET_NAME);

const PROD_URL = "https://us-central1-sight-words-app.cloudfunctions.net/words";
const URL = PROD_URL;

const getData = async (sheetId, sheetName) => {
  let data = [],
    error = null;
  try {
    const res = await axios({
      url: URL,
      method: "POST",
      data: {
        sheetId,
        sheetName,
      },
    });
    data = res.data;
    data.forEach((list) => {
      list.words = list.words.map((text) => ({ text }));
    });
  } catch (err) {
    error = err.message;
  }
  return { data, error };
};

export const useLists = () => {
  const [loading, setLoading] = useAtom(loadingAtom);
  const [data, setData] = useAtom(dataAtom);
  const [error, setError] = useAtom(errorAtom);
  const [activeSheetId, setSheetId] = useAtom(sheetIdAtom);
  const [activeSheetName, setSheetName] = useAtom(sheetNameAtom);
  const refresh = async () => {
    if (!loadingAtom.read()) {
      setLoading(true);
      const { data, error } = await getData(
        sheetIdAtom.read(),
        sheetNameAtom.read()
      );
      setData(data);
      setError(error);
      setLoading(false);
    }
  };
  const loadSheet = async (
    sheetId = "1ePibAnYJuyS4mKtBFTqi_O-_rXjiKjeHonBPTASBkgo",
    sheetName = "globe"
  ) => {
    if (!loading) {
      setLoading(true);
      const { data, error } = await getData(sheetId, sheetName);
      if (!!data && !error) {
        setSheetId(sheetId);
        setSheetName(sheetName);
      }
      setData(data);
      setError(error);
      setLoading(false);
    }
  };
  return {
    loading,
    data,
    error,
    refresh,
    loadSheet,
    activeSheetId,
    activeSheetName,
  };
};

export const useSheets = () => {
  const [sheets, setSheets] = useAtom(sheetsAtom);
  const addSheet = (sheetId, sheetName = "sheet1") => {
    setSheets([...sheets, { sheetId, sheetName }]);
  };
  return { sheets, addSheet };
};
