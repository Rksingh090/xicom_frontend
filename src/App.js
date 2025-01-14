import {useEffect} from 'react';
import XicomForm from './components/XicomForm';
import {API} from 'constant';
import axios from 'axios';

function App() {
  useEffect(() => {
    const getData = async () => {
    await axios.get(`${API}/register`);
    }
    getData();
  }, []);
  return (
    <div className="App">
      <XicomForm />
    </div>
  );
}

export default App;
