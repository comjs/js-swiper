import React, { useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import { JSSwiper } from './lib';
import { JSSwiperData } from './lib/JSSwiper';

const bannerList: JSSwiperData[] = [
  {order: 1, image: '/examples/banner1.webp', alt: 'test'},
  {order: 2, image: '/examples/banner2.jpg'},
  {order: 3, image: '/examples/banner3.jpg'},
  {order: 4, image: '/examples/banner4.gif'},
  {order: 5, image: '/examples/banner5.jpg', backgroundColor: 'rgb(164, 138, 202)', objectFit: 'contain'}
]

function App() {
  const prevButtonEl = useRef<(HTMLButtonElement | null)>(null)
  const nextButtonEl = useRef<(HTMLButtonElement | null)>(null)
  const pauseButtonEl = useRef<(HTMLButtonElement | null)>(null)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <JSSwiper
          prevButton={prevButtonEl}
          nextButton={nextButtonEl}
          stateButton={pauseButtonEl}
          startEffect="useEffectOnce"
          width={400}
          height={200}
          items={bannerList}
          interval={5000}
          duration={200}
          onChangeItem={console.log}
          onChangeState={console.log}
          onClick={console.log}
        />
        <div style={{display: 'inline-block'}}>
          <button ref={prevButtonEl}>prev</button>
          <button ref={nextButtonEl}>next</button>
          <button ref={pauseButtonEl}>pause/play</button>
        </div>
      </header>
    </div>
  );
}

export default App;
