import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Dashboard } from './pages/Dashboard';
import { InitialLoad } from './pages/InitialLoad';
import { Settings } from './pages/Settings';

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route index element={<InitialLoad />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/:accountId" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
