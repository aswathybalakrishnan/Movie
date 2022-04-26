//import logo from './logo.svg';
import './App.css';
import Card from './Components/Card/Card';
import Banner from './Components/Banner/Banner';
import Navbar from './Components/Navbar/Navbar';
import { comedy,action,originals } from './Static/urls';
function App() {
  
  return (
    <div>
    <Navbar/>
    <Banner />
    <Card  title="Netflix Orginals" url={originals}/>
    <Card  title="Comedy" url={comedy}/>
    <Card  title="Action" url={action}/>
    
    </div>
  )
} 

export default App;
