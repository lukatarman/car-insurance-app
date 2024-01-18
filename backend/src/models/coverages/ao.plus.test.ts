import { CoverageNames } from "../types.ts";
import { UserDTO } from "../user.dto.ts";
import { User } from "../user.ts";
import { AOPlus } from "./ao.plus.ts";

// Just a small note here, while I realise that the code is a bit messy due to running out of time to refactor/tidy up, I added the testing configuration
// and this small text example, just to demonstrate that I am able to write unit tests.

describe("AOPlus", function () {
  let user: User;
  let input: UserDTO;

  describe("instantiates the AOPlus class", function () {
    let result: AOPlus;

    beforeAll(function () {
      input = createDefaultInput();
      user = new User(input);

      result = new AOPlus(user, input);
    });

    it("the resulting class has the correct values", function () {
      expect(result.name).toBe(CoverageNames.ao);
      expect(result.isSelected).toBeFalsy();
      expect(result.percentageCost).toBe(0);
      expect(result.percentageCostOf).toBe("");
      expect(result.flatCost).toBe(55);
    });
  });

  describe(".checkIfSelected ", function () {
    describe("if the provided input has no existing coverages", function () {
      let aoPlus: AOPlus;
      let result: boolean;

      beforeAll(function () {
        input = createDefaultInput();

        aoPlus = new AOPlus(user, input);
        result = aoPlus.checkIfSelected(input);
      });

      it("the method returns false", function () {
        expect(result).toBeFalsy();
      });
    });

    describe("if the provided input's coverages is an empty array", function () {
      let aoPlus: AOPlus;
      let result: boolean;

      beforeAll(function () {
        input = createDefaultInput([]);

        aoPlus = new AOPlus(user, input);
        result = aoPlus.checkIfSelected(input);
      });

      it("the method returns false", function () {
        expect(result).toBeFalsy();
      });
    });

    describe("if the provided input has existing coverages", function () {
      let aoPlus: AOPlus;
      let result: boolean;

      beforeAll(function () {
        input = createDefaultInput([]);
        user = new User(input);

        const existingUser = new User(user);
        if (existingUser.coverages[1].setIsSelected)
          existingUser.coverages[1].setIsSelected(true, user);

        aoPlus = new AOPlus(user, existingUser);
        result = aoPlus.checkIfSelected(existingUser);
      });

      it("the method returns true", function () {
        expect(result).toBeTruthy();
      });
    });
  });

  describe(".setCosts ", function () {
    describe("if the provided users age is under 30", function () {
      let result: AOPlus;

      beforeAll(function () {
        input = createDefaultInput();
        user = new User(input);

        result = new AOPlus(user, input);
        result.setCosts(user);
      });

      it("the class' flat cost is set to '55'", function () {
        expect(result.flatCost).toBe(55);
      });
    });

    describe("if the provided users age is under over 30", function () {
      let result: AOPlus;

      beforeAll(function () {
        input = createDefaultInput(undefined, new Date("September 1989"));
        user = new User(input);

        result = new AOPlus(user, input);
        result.setCosts(user);
      });

      it("the class' the flat cost is set to '105'", function () {
        expect(result.flatCost).toBe(105);
      });
    });
  });

  describe(".setFlatCost ", function () {
    describe("if the provided cost is '111'", function () {
      let result: AOPlus;

      beforeAll(function () {
        input = createDefaultInput();
        user = new User(input);

        result = new AOPlus(user, input);
        result.setFlatCost(111);
      });

      it("the class' the flat cost is set to '111'", function () {
        expect(result.flatCost).toBe(111);
      });
    });
  });

  describe(".getRegularFlatCost ", function () {
    describe("if the provided users age is under 30", function () {
      let result: number;
      let aoPlus: AOPlus;

      beforeAll(function () {
        input = createDefaultInput();
        user = new User(input);

        aoPlus = new AOPlus(user, input);
        result = aoPlus.getRegularFlatCost(user);
      });

      it("the returned value is 55", function () {
        expect(result).toBe(55);
      });
    });

    describe("if the provided users age is over 30", function () {
      let result: number;
      let aoPlus: AOPlus;

      beforeAll(function () {
        input = createDefaultInput(undefined, new Date("September 1989"));
        user = new User(input);

        aoPlus = new AOPlus(user, input);
        result = aoPlus.getRegularFlatCost(user);
      });

      it("the class' the flat cost is set to '105'", function () {
        expect(result).toBe(105);
      });
    });
  });
});

const createDefaultInput = (
  coverages: undefined | [] = undefined,
  date: Date = new Date()
): UserDTO => {
  return {
    name: "Luka Tarman",
    birthday: date,
    city: "Rijeka",
    vehiclePower: 400,
    coverages,
  };
};
