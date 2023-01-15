import React, { useState } from "react";
import { useLists, useSheets } from "./data-lists";

const ErrorAlert = ({ error }) => (
  <div className="alert alert-danger">
    <h4 className="alert-heading">Error Loading Sheet</h4>
    <p>
      There was an error loading words from the google sheet. Please try again.
    </p>
    <hr />
    <div style={{ fontWeight: "bold" }}>Details:</div>
    <pre>{error}</pre>
  </div>
);

const SheetCtaCard = ({
  loading,
  sheetId,
  sheetName,
  active,
  loadSheet,
  listTitles = [],
}) => {
  return (
    <div className="card mb-3" key={`${sheetId}@${sheetName}`}>
      <div className="card-body d-flex">
        <div className="px-5">
          <button
            className={`btn btn-${active ? "success" : "primary"} btn-lg`}
            disabled={loading || active}
            onClick={() => loadSheet(sheetId, sheetName)}
          >
            {active ? "ACTIVE" : "LOAD"}
          </button>
        </div>
        <div className="card-text flex-grow-1">
          <h3>{sheetName}</h3>
          <code>{sheetId}</code>
          {active && (
            <div>
              {listTitles.map((title) => (
                <span className="badge text-bg-secondary me-3">{title}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AddSheetForm = ({ addSheet }) => {
  const [sheetId, setSheetId] = useState("");
  const [sheetName, setSheetName] = useState("");
  return (
    <div>
      <div className="input-group">
        <input
          type="text"
          className="form-control mb-2"
          value={sheetId}
          onChange={(e) => setSheetId(e.target.value)}
          placeholder="Google Spreadsheet ID"
        />
      </div>
      <div className="input-group">
        <input
          type="text"
          className="form-control mb-2"
          value={sheetName}
          onChange={(e) => setSheetName(e.target.value)}
          placeholder="Tab Name"
        />
      </div>
      <div className="mb-2">
        <button
          className="btn btn-primary me-3"
          addSheet={() => addSheet(sheetId, sheetName)}
        >
          Add Sheet
        </button>
        <button
          className="btn btn-danger me-3"
          onClick={() => {
            setSheetId("");
            setSheetName("");
          }}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

const Settings = () => {
  const { sheets } = useSheets();
  const { loading, data, activeSheetId, activeSheetName, error, loadSheet } =
    useLists();
  console.log(data);
  return (
    <div>
      <h1>Settings</h1>
      <h2>Manage Sheets</h2>
      {error && (
        <div className="my-3">
          <ErrorAlert error={error} />
        </div>
      )}
      <div className="my-3">
        {sheets.map(({ sheetId, sheetName }) => (
          <SheetCtaCard
            loading={loading}
            listTitles={data.map(({ title }) => title)}
            sheetId={sheetId}
            sheetName={sheetName}
            active={(sheetId = activeSheetId && sheetName === activeSheetName)}
            loadSheet={loadSheet}
            key={`${sheetId}@${sheetName}`}
          />
        ))}
      </div>
      {/* <h2>Add New Sheet</h2>
      <AddSheetForm addSheet={loadSheet} /> */}
    </div>
  );
};

export default Settings;
