import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Route exact path="/" component={Home}/>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
