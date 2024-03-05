import { useContext, useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import { AppContext } from '../../context/Context'
import { UpdatePageDetails, UpdateFavorites } from '../../context/Actions'
import { fetchList } from '../../ApiService'
import './List.scss'

export const List = () => {
  const { favorites, pageDet, dispatch } = useContext(AppContext);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  const listEnd = useRef();

  useEffect(() => {
    fetchItemList(pageDet.pageSize);
    scrollToBottom();
  }, []);

  useEffect(() => {
    prepareFavoriteList();
  }, [favorites.length]);

  const scrollToBottom = () => {
    setTimeout(() => {
      if (listEnd.current)
        listEnd.current.scrollIntoView({ behavior: "smooth" })
    }, 250);
  };

  const prepareFavoriteList = () => {
    setFavoriteIds([
      ...favorites.map(f => f.id)
    ]);
  };

  const fetchItemList = (pageSize) => {
    fetchList(pageDet.pageNo, pageSize)
      .then(res => {
        if (res.data) {
          setList([
            ...res.data
          ]);
          dispatch(UpdatePageDetails({
            ...pageDet,
            pageSize: pageSize
          }));
        }
      });
  };

  const updateFavorites = (item) => {
    const index = favoriteIds.indexOf(item.id);
    if (index === -1) {
      favorites.push(item);
    } else {
      favorites.splice(index, 1);
    }
    dispatch(UpdateFavorites([
      ...favorites
    ]));
  };

  const getScrollPoint = (i) => {
    if (list.length > 20)
      return (i === (list.length - 20)) ? listEnd : null;
    else
      return null;
  }

  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <div className="header">
        <h3 className="page-title">List</h3>
        <span className="link-text" onClick={handleNavigate}>Back to Dashboard</span>
      </div>
      <div className="content">
        <InfiniteScroll
            dataLength={list.length}
            next={() => fetchItemList(pageDet.pageSize + 10)}
            hasMore={true}
            loader={<h4>Loading...</h4>}
          >
            {
              list.map((i, index) => (
                <div className="item-wrapper" key={i.id} ref={getScrollPoint(index)}>
                  <div className="det-wrapper">
                    <img className="thumbnail-img" src={i.thumbnailUrl} alt="no thumbnail" />
                    <span className="item-det">
                      #{i.id} - {i.title}
                    </span>
                  </div>
                  <button className={"action-btn" + (favoriteIds.includes(i.id) ? " critical" : "")}
                          onClick={() => updateFavorites(i)}>
                    { favoriteIds.includes(i.id) ? '- Favorite' : '+ Favorite'}
                  </button>
                </div>
              ))
            }
        </InfiniteScroll>
      </div>
    </div>
  )
}
