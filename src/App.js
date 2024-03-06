import { Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages'
import { List } from './pages'
import './App.scss'

function App() {
  // Routes defined for Dashboard and List
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
