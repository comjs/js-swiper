# Swiper
Beautiful swiper for React

## Demo


https://user-images.githubusercontent.com/107611589/222640699-2c32bfe6-2ae9-473b-b45f-f4ca41f96a71.mov



## Install
`npm install @comjaes/swiper`

## Usage

### For general
```Typescript
import {JSSwiper} from '@comjaes/swiper'
import {JSSwiperData} from '@comjaes/swiper/dist/cjs/src/lib/JSSwiper'

...

const stateEl = useRef<HTMLButtonElement>(null)

const itemList: JSSwiperData[] = [
  {order: 1, image: '/image8.png'},
  {order: 2, image: '/image9.png'},
  {order: 3, image: '/image10.png'},
]

...

<JSSwiper
  items={itemList}
  stateButton={stateEl.current}
  duration={200}
  interval={5000}
  onChangeItem={console.log}
  onChangeState={console.log}
/>
<button ref={stateEl}>Toggle State</button>
```

### For React development environment
> This feature is for About [useEffect called twice issue in React 18](https://github.com/facebook/react/issues/24553)

```Typescript
<JSSwiper
  ...
  startEffect="useEffectOnce"
 />
```
or
```Typescript
const useEffectOnce = (callback: React.EffectCallback, dependencyList: React.DependencyList | undefined) => {
  ...
}

...

<JSSwiper
  ...
  startEffect={useEffectOnce}
 />
```

## Properties
|Property|Default|Type|Description|
|---|:---:|---|---|
|items|undefined|extends [`JSSwiperData`](#jsswiperdata)||
|prevButton|undefined|extends `HTMLElement`||
|nextButton|undefined|extends `HTMLElement`||
|stateButton|undefined|extends `HTMLElement`||
|duration|200|`number`||
|interval|0|`number`||
|width|undefined|`number`||
|height|undefined|`number`||
|startEffect|undefined|`'useEffectOnce'` or [`useEffect type`](#typeof-useeffect)|[`For React dev environment`](#for-react-development-environment)|

<details>
<summary><a id="jsswiperdata">JSSwiperData</a></summary>

```Typescript
type JSSwiperData = {
  image: string
  order: number
  /** image styles */
  backgroundColor?: Property.BackgroundColor
  objectFit?: Property.ObjectFit
} & ({
  link: string
  newTab?: boolean
} | {
  link?: never
  newTab?: never
})
```
</details>

<details>
<summary><a id="typeof-useeffect">useEffect type</a></summary>

```Typescript
(callback: React.EffectCallback, dependencyList: React.DependencyList | undefined) => void
```
</details>
