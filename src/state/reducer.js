import { combineReducers } from "redux";

import documentTypes from "./documentTypes/reducer";
import specialties from "./specialties/reducer";
import nurse from "./nurse/reducer";
import documents from "./documents/reducer";
import compliance from "./compliance/reducer";

export default combineReducers({
    documentTypes,
    specialties,
    nurse,
    documents,
    compliance
});
