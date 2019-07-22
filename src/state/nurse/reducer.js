// import * as actions from "./actions";

const initialState = {
  job: {
    baseDocumentTypesIds: [0, 1, 2],
    specialtiesIds: []
  }
};

export default (state = initialState, action) => {
    switch (action.type) {

        default:
            return state;
    }
};
