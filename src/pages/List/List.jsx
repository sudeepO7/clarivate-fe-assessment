import { useContext, useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import { AppContext } from '../../context/Context'
import { UpdatePageDetails, UpdateFavorites } from '../../context/Actions'
import { fetchList } from '../../ApiService'

const SCROLL_POINT = 20;

export const List = () => {
  const { favorites, pageDet, dispatch } = useContext(AppContext);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  const listEnd = useRef();

  /**
   * This useEffect is for initial page mount
   */
  useEffect(() => {
    fetchItemList(pageDet.pageSize);
    scrollToBottom();
  }, []);

  /**
   * This useEffect is called on updation in Favorites.
   * On that basis we update the action button for add
   * or remove favorite in the list
   */
  useEffect(() => {
    prepareFavoriteList();
  }, [favorites.length]);

  /**
   * This is to move the user to the previous point till
   * which he/she has scrolled before when he/she returns
   * to the List page
   */
  const scrollToBottom = () => {
    setTimeout(() => {
      if (listEnd.current)
        listEnd.current.scrollIntoView({ behavior: "smooth" })
    }, 400);
  };

  /**
   * Maintain a array of ids for the favorite list
   */
  const prepareFavoriteList = () => {
    setFavoriteIds([
      ...favorites.map(f => f.id)
    ]);
  };

  /**
   * Fetch the items as per pageSize
   * @param {number} pageSize
   */
  const fetchItemList = (pageSize) => {
    fetchList(pageDet.pageNo, pageSize)
      .then(res => {
        if (res) {
          if (res.length < pageSize) {
            setHasMore(false);
          } else {
            setList([
              ...res
            ]);
            dispatch(UpdatePageDetails({
              ...pageDet,
              pageSize: pageSize
            }));
          }
        }
      }).catch((err) => {
        // Handle Error
        console.log('Error => ', err);
      });
  };

  /**
   * Updates the favorites list
   * @param {object} item
   */
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

  /**
   * Identify the item till which we need to scroll
   * @param {number} i
   */
  const getScrollPoint = (i) => {
    if (list.length > SCROLL_POINT)
      return (i === (list.length - SCROLL_POINT)) ? listEnd : null;
    else
      return null;
  }

  /**
   * Navigate to Dashboard
   */
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
        <h3 className="sub-heading">Item List</h3>
        { !list.length && (<span className="info-text">No Items Found</span>) }
        <InfiniteScroll
            dataLength={list.length}
            next={() => fetchItemList(pageDet.pageSize + 10)}
            hasMore={hasMore}
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
