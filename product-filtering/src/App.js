import { Route, Routes } from 'react-router-dom';
import './App.css';
import AdminPanel from './components/admin/AdminPanel';
import Main from './components/Main';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <div className="logo">
          <h1>Product Finder</h1>
        </div>
      </header>
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/admin" element={<AdminPanel/>} />
      </Routes>
    </div>
  );
}

export default App;
