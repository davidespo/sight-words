import { atom, useAtom } from "jotai";

const gapi = window.gapi;

const entry = (text, img = null) => ({ text, img });

const getData = async (gapi, spreadsheetId) => {
  const params = {
    spreadsheetId,
    range: "A1:Z1",
  };
  console.log(gapi);
  let request = await gapi.client.sheets.spreadsheets.values.get(params);
  console.log(request.result);
};

const listsAtom = atom({
  loading: false,
  initialized: true,
  data: [
    {
      id: "A",
      title: "Drive Flash Cards",
      words: [
        entry("see"),
        entry("me"),
        entry("look"),
        entry("this"),
        entry("a"),
        entry("I"),
        entry("at"),
        entry("you"),
        entry("like"),
        entry("the"),
        entry("can"),
        entry("am"),
        entry("big"),
        entry("little"),
        entry("that"),
        entry("is"),
        entry("Look at me."),
        entry("The cat is little"),
        entry("That is big!"),
        entry("I am big!"),
        entry("This is a dog."),
        entry("Can I see that?"),
        entry("I see you."),
      ],
    },
    {
      id: "B",
      title: "Old Cards",
      words: [
        entry("for"),
        entry("to"),
        entry("by"),
        entry("be"),
        entry("he"),
        entry("it"),
        entry("like"),
        entry("with"),
        entry("and"),
        entry("up"),
        entry("help"),
        entry("on"),
        entry("not"),
        entry("of"),
        entry("see"),
        entry("you"),
        entry("was"),
        entry("there"),
        entry("come"),
        entry("in"),
        entry("or"),
        entry("go"),
        entry("we"),
        entry("are"),
        entry("so"),
        entry("but"),
      ],
    },
    {
      id: "_hank",
      title: "Hank's Favorite <3",
      words: [
        entry("love"),
        entry("Mom"),
        entry("and"),
        entry("Dad"),
        entry("and"),
        entry("Oneida"),
        entry("and"),
        entry("Annabett"),
      ],
    },
    {
      id: "_bookHanksBank",
      title: "Hank's Bank",
      words: [
        entry("hank"),
        entry("bank"),
        entry("frank"),
        entry("prank"),
        entry("plank"),
        entry("sank"),
        entry("yank"),
        entry("thank"),
        entry("clickity-clank"),
      ],
    },
    {
      id: "_hank2",
      title: "Hank's List",
      words: [entry("the"), entry("golden"), entry("key")],
    },
  ],
  error: null,
});

export const useLists = () => {
  const [state, setState] = useAtom(listsAtom);

  const refresh = async () => {
    const spreadsheetId = "1ePibAnYJuyS4mKtBFTqi_O-_rXjiKjeHonBPTASBkgo";
    return getData(gapi, spreadsheetId);
  };
  const fetch = (url) => {
    const spreadsheetId = "1ePibAnYJuyS4mKtBFTqi_O-_rXjiKjeHonBPTASBkgo";
    return getData(gapi, spreadsheetId);
  };
  return { state, refresh, fetch };
};
