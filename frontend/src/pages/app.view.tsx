import DiscountsHeader from "../components/DiscountsHeader";
import UserData from "../components/UserData";
import CoveragesSidebar from "../components/CoveragesSidebar";
import AppBehavior from "./app.behavior";
import PriceInfo from "../components/PriceInfo";

function App() {
  const { handleFormSubmit, handleIsSelectedChange } = AppBehavior();

  return (
    <div className="App">
      <form onSubmit={handleFormSubmit}>
        <DiscountsHeader handleIsSelectedChange={handleIsSelectedChange} />
        <div className="flex">
          <UserData />
          <CoveragesSidebar handleIsSelectedChange={handleIsSelectedChange} />
        </div>
      </form>
      <PriceInfo />
      <div className="ml-2 mt-5">
        Please open the console (F12) to see the state of the database
      </div>
      <div className="ml-2 mt-5">
        A small note on the functionality. Upon clicking save, the application checks the
        database for an existing user under the same name. This allows for modifying the
        values of a user that is already added.
      </div>
    </div>
  );
}

export default App;
