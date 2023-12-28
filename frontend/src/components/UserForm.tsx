import React from "react";
import UserFormInput from "./UserFormInput";

const UserForm = () => {
  const formValues = [
    {
      inputName: "name",
      inputType: "text",
    },
    {
      inputName: "birthdate",
      inputType: "date",
    },
    {
      inputName: "city",
      inputType: "text",
    },
    {
      inputName: "vehicle power",
      inputType: "number",
    },
    {
      inputName: "voucher",
      inputType: "number",
    },
    {
      inputName: "price match",
      inputType: "number",
    },
  ];

  return (
    <div className="p-8 flex flex-col justify-center">
      <h2 className="text-2xl mb-4">User data</h2>
      <form>
        <div>
          <UserFormInput formValues={formValues} />
        </div>
      </form>
    </div>
  );
};

export default UserForm;
