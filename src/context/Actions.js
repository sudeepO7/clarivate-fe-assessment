import { UPDATE_FAVORITES, UPDATE_PAGE_DET } from './Types'

export const UpdateFavorites = (payload) => ({
    type: UPDATE_FAVORITES,
    payload
});

export const UpdatePageDetails = (payload) => ({
    type: UPDATE_PAGE_DET,
    payload
});