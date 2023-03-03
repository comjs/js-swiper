import logo from './logo.svg';
import './App.css';
import JSSlider from './lib/JSSlider';

function App() {
  const bannerList = [
    {order: 1, image: '/examples/banner1.webp'},
    {order: 2, image: '/examples/banner2.jpg'},
    {order: 3, image: '/examples/banner3.jpg'},
  ]

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <JSSlider
          startEffect="useEffectOnce"
          width={400}
          height={200}
          items={bannerList}
          interval={5000}
          duration={1000}
          onChangeItem={console.log}
          onChangeState={console.log}
        />
      </header>
    </div>
  );
}

export default App;
