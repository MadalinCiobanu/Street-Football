import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Register from './components/register/RegisterForm';
import Login from './components/login/LoginForm';
import About from './components/About';
import ComingSoon from './components/ComingSoon';


function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Route exact path="/" component={Home}/>
        <Route path="/register" component={Register}/>
        <Route path="/login" component={Login}/>
        <Route path="/about" component={About}/>
        <Route path="/team" component={ComingSoon}/>
        <Route path="/tournament" component={ComingSoon}/>
        <Route path="/referee" component={ComingSoon}/>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
