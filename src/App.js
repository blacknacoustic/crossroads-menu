import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HotBarAdmin from './components/HotBarAdmin2';
import TVDisplayDashboard from './components/TVDisplayDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<HotBarAdmin />} />
        <Route path="/display" element={<TVDisplayDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
