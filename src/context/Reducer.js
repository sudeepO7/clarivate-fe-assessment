import { UPDATE_FAVORITES, UPDATE_PAGE_DET } from './Types'

const Reducer = (state, action) => {
    switch (action.type) {
        case UPDATE_FAVORITES:
            return {
                ...state,
                favorites: [
                    ...action.payload
                ]
            };
        case UPDATE_PAGE_DET:
            return {
                ...state,
                pageDet: {
                    ...action.payload
                }
            };
        default:
            return {
                ...state
            };
    }
};

export default Reducer;