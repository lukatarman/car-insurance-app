import React from "react";
import DiscountsHeader from "../components/DiscountsHeader";
import UserData from "../components/UserData";
import CoveragesSidebar from "../components/CoveragesSidebar";
import { addUser } from "../adapters/http.client.adapter";

function App() {
  const handleFormSubmit = async (e: any) => {
    e.preventDefault();

    const response = await addUser({ name: "Test", age: 5 });

    console.log(response);
  };

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
