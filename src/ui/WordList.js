import { LISTS } from "./data";
import { useLists } from "./data-lists";

import { useState } from "react";
import { useAtom } from "jotai";

import { useParams } from "react-router-dom";

const VIEW_SUMMARY = "SUMMARY";
const VIEW_CLICK = "CLICK";

const WordListSummary = ({ list }) => {
  const { title, words } = list;
  return (
    <div>
      <h2>{title}</h2>
      <div className="row">
        {words.map(({ text }) => (
          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-2">
            <div className="card">
              <div className="card-body">
                <div className="card-text text-center py-5">
                  <p className="h1">{text}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const WordClickList = ({ list }) => {
  const [index, setIndex] = useState(0);
  const { text } = list.words[index] ?? {};
  const length = list.words.length;
  if (index >= length) {
    return (
      <div className="text-center">
        <div className="text-muted h2">All Done :)</div>
        <button className="btn btn-success" onClick={() => setIndex(0)}>
          Reset
        </button>
      </div>
    );
  }
  // TODO: end of list
  return (
    <div className="card" style={{ minHeight: "60vh" }}>
      <div className="card-body d-flex flex-column">
        <div
          className="card-text flex-grow-1 d-flex justify-content-center align-items-center"
          onClick={() => setIndex(index + 1)}
        >
          <div className="display-1">{text}</div>
        </div>
        <div className="card-text px-5">
          <div className="d-flex justify-content-between">
            <div>
              <button
                className="btn btn-sm btn-secondary"
                onClick={() => setIndex(index - 1)}
                disabled={index <= 0}
              >
                &lt;= Back
              </button>
            </div>
            <em className="text-muted">{`${index + 1} of ${length}`}</em>
          </div>
        </div>
      </div>
    </div>
  );
};

const CONTENT_MAP = {
  [VIEW_SUMMARY]: WordListSummary,
  [VIEW_CLICK]: WordClickList,
};

const WordList = () => {
  const { state, loading } = useLists();
  const { id } = useParams();
  const [view, setView] = useState(VIEW_SUMMARY);
  const Content = CONTENT_MAP[view] ?? WordListSummary;
  if (loading) {
    return (
      <div className="text-center text-muted h1">
        <em>Loading...</em>
      </div>
    );
  }
  const list = state.data.find((item) => id === item.id);
  if (!list) {
    return (
      <div className="mt-5 text-muted text-center h1">
        <em>There is nothing here...</em>
      </div>
    );
  }
  return (
    <div className="p-3 mt-3">
      <div>
        <button
          className="btn btn-sm btn-primary"
          onClick={() =>
            setView(view === VIEW_SUMMARY ? VIEW_CLICK : VIEW_SUMMARY)
          }
        >
          Switch View
        </button>
      </div>
      <Content list={list} />
    </div>
  );
};

export default WordList;
