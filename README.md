# Slider
Beautiful slider for React

## Install
`npm install -s js-slider`

## Usage

### For general
```Typescript
import {JSSlider} from 'js-slider'
import {JSSliderData} from 'js-slider/dist/cjs/src/lib/JSSlider'

...

const itemList: JSSliderData[] = [
  {order: 1, image: '/image8.png'},
  {order: 2, image: '/image9.png'},
  {order: 3, image: '/image10.png'},
]

...

<JSSlider
  items={itemList}
  duration={200}
  interval={5000}
  onChangeItem={console.log}
  onChangeState={console.log}
 />
```

### For React development environment
> This feature is due to [useEffect called twice issue in React 18](https://github.com/facebook/react/issues/24553)

```Typescript
<JSSlider
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

<JSSlider
  ...
  startEffect={useEffectOnce}
 />
```

## Properties
|Property|Default|Type|Description|
|---|:---:|---|---|
|items|undefined|`JSSliderData`||
|prevButton|undefined|`HTMLElement`||
|nextButton|undefined|`HTMLElement`||
|stateButton|undefined|`HTMLElement`||
|duration|200|`number`||
|interval|0|`number`||
|width|undefined|`number`||
|height|undefined|`number`||
|startEffect|undefined|`'useEffectOnce'` or [`useEffect type`](#typeof-useeffect)|[`For React dev environment`](#for-react-development-environment)|

<details>
<summary><a id="typeof-useeffect">useEffect type</a></summary>

```Typescript
(callback: React.EffectCallback, dependencyList: React.DependencyList | undefined) => void
```
</details>
