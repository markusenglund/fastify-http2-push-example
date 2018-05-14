import { h, Component } from "preact";
import Router, { Link } from "preact-router";
import "./App.scss";

class Home extends Component {
  render() {
    return (
      <div>
        <h1 className="header">Home</h1>
        <Link href="/about">About</Link>
      </div>
    );
  }
}

const About = () => <h1>About</h1>;

const App = ({ url }) => (
  <Router url={url}>
    <Home path="/" />
    <About path="/about" />
  </Router>
);

export default App;
