import React from "react";
import { mount, shallow } from "enzyme";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import { create } from "react-test-renderer";
import ConnectedPaymentsPage, { PaymentsPage } from "./PaymentsPage";
import FuelSavingsForm from "../FuelSavingsForm";
import initialState from "../../reducers/initialState";

describe("<PaymentsPage />", () => {
  const actions = {
    saveFuelSavings: jest.fn(),
    calculateFuelSavings: jest.fn()
  };

  it("should contain <FuelSavingsForm />", () => {
    const wrapper = shallow(
      <PaymentsPage
        actions={actions}
        fuelSavings={initialState.fuelSavings}
      />
    );

    expect(wrapper.find(FuelSavingsForm).length).toEqual(1);
  });

  it.skip("calls saveFuelSavings upon clicking save", () => {
    const wrapper = mount(
      <PaymentsPage
        actions={actions}
        fuelSavings={initialState.fuelSavings}
      />
    );

    const save = wrapper.find('input[type="submit"]');
    save.simulate("click");

    expect(actions.saveFuelSavings).toHaveBeenCalledWith(
      initialState.fuelSavings
    );
  });

  it("calls calculateFuelSavings upon changing a field", () => {
    const wrapper = mount(
      <PaymentsPage
        actions={actions}
        fuelSavings={initialState.fuelSavings}
      />
    );
    const name = "newMpg";
    const value = 10;

    const input = wrapper.find('input[name="ccNumber"]');
    input.simulate("change", { target: { name, value } });

    expect(actions.calculateFuelSavings).toHaveBeenCalledWith(
      initialState.fuelSavings,
      name,
      value
    );
  });

  it.skip("should match snapshot", () => {
    const store = configureMockStore()(initialState);
    const component = create(
      <Provider store={store}>
        <ConnectedPaymentsPage />
      </Provider>
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
