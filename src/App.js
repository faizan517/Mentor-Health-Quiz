import logo from './logo.svg';
import './App.css';
import Quiz from './screens/QuestionAnswer';
import { Route, Routes } from 'react-router-dom';
import '@coreui/coreui/dist/css/coreui.min.css'
import Result from './components/Response';
// import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
    <Routes>
          <Route path="/form/:slug" name="Page 500" element={<Quiz />} />
          <Route path="/response/:id/:slug" name="Home" element={<Result />} />
        {/* </Routes> */}
        {/* {/* <ToastContainer position="bottom-left" autoClose={3000} hideProgressBar={false} /> */}
    </Routes>
    </>
  );
}

export default App;