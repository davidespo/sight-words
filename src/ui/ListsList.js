import { useLists } from "./data-lists";

import { Link } from "react-router-dom";

const ListCard = ({ list }) => {
  const { id, title } = list;
  return (
    <div className="card">
      <div className="card-body">
        <div className="card-text h2">{title}</div>
        <div className="card-text">
          <Link className="btn btn-primary" to={`/lists/${id}`}>
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

const ListsList = () => {
  const {
    state: { loading, data },
    refresh,
    fetch,
  } = useLists();
  if (loading) {
    return (
      <div className="text-center text-muted h1">
        <em>Loading...</em>
      </div>
    );
  }
  return (
    <div>
      <div className="py-5">
        <button className="btn btn-success" onClick={() => refresh()}>
          Refresh
        </button>
      </div>
      <div className="row pt-5">
        {data.map((list) => (
          <div className="col-lg-4 col-md-6 col-sm-12 mb-3" key={list.id}>
            <ListCard list={list} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListsList;
