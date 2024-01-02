import React from "react";
import DiscountsHeader from "../components/DiscountsHeader";
import UserData from "../components/UserData";
import CoveragesSidebar from "../components/CoveragesSidebar";

function App() {
  const handleFormSubmit = (e: any) => {
    e.preventDefault();

    // const formData: formData = {
    //   name: nameInput,
    //   birthdate: birthdateInput,
    //   city: cityInput,
    //   vehiclePower: vehiclePowerInput,
    //   voucher: voucherInput,
    //   priceMatch: priceMatchInput,
    // };

    console.log("submitted");
    // console.log(formData);
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
