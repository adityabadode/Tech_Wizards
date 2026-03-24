import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LiveTranscript from './pages/LiveTranscript';
import SessionHistory from './pages/SessionHistory';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SessionHistory />} />
        <Route path="/transcript/:caseId" element={<LiveTranscript />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
