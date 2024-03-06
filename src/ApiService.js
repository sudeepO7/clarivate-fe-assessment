const apiEndpoint = process.env.REACT_APP_API_BASEURL;

export const fetchList = (_page, _limit) => {
    return fetch(apiEndpoint + 'albums/1/photos?' + new URLSearchParams({
        _page,
        _limit
    })).then(response => response.json());
};