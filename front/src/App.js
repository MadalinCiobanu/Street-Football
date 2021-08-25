import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Register from './components/register/RegisterForm';
import Login from './components/login/LoginForm';
import About from './components/About';
import ComingSoon from './components/ComingSoon';
import UserDetails from './components/userDetails/UserDetails';
import EditUser from './components/userDetails/EditUser';
import TeamDetails from './components/teamDetails/TeamDetails';
import TeamCreator from './components/teamDetails/TeamCreator';
import TeamSearch from './components/teamDetails/TeamSearch';
import ApplicationForm from './components/teamApplication/ApplicationForm';
import TeamApplications from './components/teamDetails/applications/TeamApplications';
import AcceptUser from './components/teamDetails/applications/AcceptUser';


function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Route exact path="/" component={Home}/>
        <Route path="/register" component={Register}/>
        <Route path="/login" component={Login}/>
        <Route path="/about" component={About}/>
        <Route path="/user" component={UserDetails}/>
        <Route path="/user-edit" component={EditUser}/>
        <Route path="/team" component={TeamDetails}/>
        <Route path="/create-team" component={TeamCreator}/>
        <Route path="/application/:id" component={ApplicationForm}/>
        <Route path="/applications" component={TeamApplications}/>
        <Route path="/accept/:id" component={AcceptUser}/>
        <Route path="/team-search" component={TeamSearch}/>
        <Route path="/tournament" component={ComingSoon}/>
        <Route path="/referee" component={ComingSoon}/>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
