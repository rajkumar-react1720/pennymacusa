import logo from './logo.svg';
import './App.css';
import ShowsList from './components/ShowsList/Shows_List';
import Header from './components/Header/Header';

function App() {
  return (
    <div className="App">
      <Header/>
      <ShowsList/>
    </div>
  );
}

export default App;
