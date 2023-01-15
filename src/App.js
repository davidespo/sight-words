import { Route, Routes } from "react-router-dom";
import Header from "./ui/Header";
import ListsList from "./ui/ListsList";
import WordList from "./ui/WordList";
import Settings from "./ui/Settings";

const App = () => {
  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path="/" index element={<ListsList />} />
        <Route path="/lists" index element={<ListsList />} />
        <Route path="/lists/:id" index element={<WordList />} />
        <Route path="/settings" index element={<Settings />} />
      </Routes>
    </div>
  );
};
export default App;
