import axios from 'axios'

const apiEndpoint = process.env.REACT_APP_API_BASEURL;

export const fetchList = (_page, _limit) => {
    return axios.get(apiEndpoint + 'albums/1/photos', {
        params: {
            _page,
            _limit
        }
    });
};