import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../context/Context'
import { UpdateFavorites } from '../../context/Actions'

export const Dashboard = () => {
  const navigate = useNavigate();
  const { favorites, dispatch } = useContext(AppContext);

  /**
   * Navigate to Dashboard
   */
  const handleNavigate = () => {
    navigate("/list");
  };

  /**
   * Updates the favorites list
   * @param {number} id
   */
  const updateFavorites = (id) => {
    dispatch(UpdateFavorites([
      ...favorites.filter(f => f.id !== id)
    ]));
  };

  return (
    <div className="dashboard-container">
      <div className="header">
        <h3 className="page-title">Dashboard</h3>
        <span className="link-text" onClick={handleNavigate}>List</span>
      </div>
      <div className="content">
        <h3 className="sub-heading">Favorites</h3>
        { !favorites.length && (<span className="info-text">No Favorites Added. You can add from the <span className="link-text" onClick={handleNavigate}>List</span>.</span>) }
        {
          favorites.map((i) => (
            <div className="item-wrapper" key={i.id}>
              <div className="det-wrapper">
                <img className="thumbnail-img" src={i.thumbnailUrl} alt="no thumbnail" />
                <span className="item-det">
                  #{i.id} - {i.title}
                </span>
              </div>
              <button className="action-btn critical"
                      onClick={() => updateFavorites(i.id)}>
                - Favorite
              </button>
            </div>
          ))
        }
      </div>
    </div>
  )
}
