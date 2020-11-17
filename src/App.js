import './App.css';

function Welcome(props) {
    return <h3>Hello, {props.name}</h3>;
  }

function App() {
	return (
        <div id="root">
            <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
      <Welcome name="Teddie" />
      <h1>Test</h1>
    </div>
        </div>
    );
}


export default App;
