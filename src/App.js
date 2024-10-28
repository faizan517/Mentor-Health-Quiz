import logo from './logo.svg';
import './App.css';
import Quiz from './screens/QuestionAnswer';
import { Route, Routes } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
    <Routes>
          <Route path="/" name="Page 500" element={<Quiz />} />
          {/* <Route path="*" name="Home" element={<DefaultLayout />} /> */}
        </Routes>
        {/* <ToastContainer position="bottom-left" autoClose={3000} hideProgressBar={false} /> */}
    </>
  );
}

export default App;
