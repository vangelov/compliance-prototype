import * as actions from "./actions";

const initialState = []

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.SPECIALTIES_ADD:
          return [
            ...state,
            { id: state.length + 1, ...action.specialty }
          ];

        default:
            return state;
    }
};
