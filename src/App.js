import { Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard/Dashboard'
import { List } from './pages/List/List'
import './App.scss'

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/"  element={<Dashboard />} />
        <Route path="/list" element={<List />} />
      </Routes>
    </div>
  );
}

export default App;
