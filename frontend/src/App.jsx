// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/Homepage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Layout>
            {({ isDarkMode }) => <HomePage isDarkMode={isDarkMode} />}
          </Layout>
        } />
      </Routes>
    </Router>
  );
};

export default App;