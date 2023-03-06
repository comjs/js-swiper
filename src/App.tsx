import logo from './logo.svg';
import './App.css';
import JSSwiper, { JSSwiperData } from './lib/JSSwiper';

function App() {
  const bannerList: JSSwiperData[] = [
    {order: 1, image: '/examples/banner1.webp'},
    {order: 2, image: '/examples/banner2.jpg'},
    {order: 3, image: '/examples/banner3.jpg'},
    {order: 4, image: '/examples/banner4.gif'},
    {order: 5, image: '/examples/banner5.jpg', backgroundColor: 'rgb(164, 138, 202)', objectFit: 'contain'}
  ]

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <JSSwiper
          startEffect="useEffectOnce"
          width={400}
          height={200}
          items={bannerList}
          interval={5000}
          duration={200}
          onChangeItem={console.log}
          onChangeState={console.log}
        />
      </header>
    </div>
  );
}

export default App;
