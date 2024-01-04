import DiscountsHeader from "../components/DiscountsHeader";
import UserData from "../components/UserData";
import CoveragesSidebar from "../components/CoveragesSidebar";
import AppBehavior from "./app.behavior";

function App() {
  const handleFormSubmit = AppBehavior();

  return (
    <div className="App">
      <form onSubmit={handleFormSubmit}>
        <DiscountsHeader />
        <div className="flex">
          <UserData />
          <CoveragesSidebar />
        </div>
      </form>
    </div>
  );
}

export default App;
