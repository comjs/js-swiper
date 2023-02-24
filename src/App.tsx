import logo from './logo.svg';
import './App.css';
import JSSlider from './lib/JSSlider';

function App() {
  const bannerList = [
    {order: 1, image: 'https://bananabd.com/web/product/big/202212/d3b2af515355fce99eb9567ce4c66f39.gif'},
    {order: 2, image: 'https://m.bananabd.com/web/product/medium/202208/cb17072ff483952dedea2aaa46ee6e9e.gif'},
    {order: 3, image: 'https://image.ohou.se/i/bucketplace-v2-development/uploads/store/banners/store_home_banners/167689108927489491.png?w=2560'},
  ]

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <JSSlider
          startEffect="useEffectOnce"
          width={200}
          height={120}
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
