import * as Styled from '../styles/styled'
import {TIMINGFUNC_MAP} from '../utils/functions'
import {CSSProperties, DependencyList, MouseEvent, useCallback, useEffect, useMemo, useRef, useState} from 'react'
import useEffectOnce from '../utils/useEffectOnce'
import {Property} from 'csstype'

export type JSSwiperData = {
  image: string
  order: number
  /** image styles */
  backgroundColor?: Property.BackgroundColor
  objectFit?: Property.ObjectFit
  alt?: string
} & (
  | {
      link: string
      newTab?: boolean
    }
  | {
      link?: never
      newTab?: never
    }
)
interface SwiperState<T> {
  prev?: T
  visible: T
  next?: T
}

interface TimerBarProps {
  interval: number
  initStartTime: number
  forcePause: boolean
}

const TimerBar = ({interval, initStartTime, forcePause}: TimerBarProps) => {
  const [style, setStyle] = useState<CSSProperties>()

  useEffect(() => {
    if (forcePause) return

    let frameId: number
    let start: number = initStartTime

    const step: FrameRequestCallback = time => {
      const timestamp = performance.timeOrigin + time
      if (!start) start = timestamp
      const diff = timestamp - start
      const percentage = Math.min(diff / interval, 1)

      setStyle({left: `${percentage * 100}%`, width: `${100 - percentage * 100}%`})

      if (diff <= interval) {
        frameId = requestAnimationFrame(step)
      }
    }

    frameId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frameId)
  }, [interval, initStartTime, forcePause])

  return <Styled.TimerBar style={style} />
}

interface ImageWrapperProps<T> {
  item: T
  onClick?: (e: MouseEvent<HTMLElement>, item: T) => void
}

const ImageWrapper = <T extends JSSwiperData>({item, onClick}: ImageWrapperProps<T>) => {
  return item.link ? (
    <Styled.ImageWrapperA onClick={e => onClick?.(e, item)} theme={{backgroundColor: item.backgroundColor}} href={item.link} target={item.newTab ? '_blank' : undefined} rel="noopener noreferrer" draggable={false}>
      <Styled.Image theme={{objectFit: item.objectFit}} src={item.image} draggable={false} alt={item.alt} />
    </Styled.ImageWrapperA>
  ) : (
    <Styled.ImageWrapperDiv onClick={e => onClick?.(e, item)} theme={{backgroundColor: item.backgroundColor}}>
      <Styled.Image theme={{objectFit: item.objectFit}} src={item.image} draggable={false} alt={item.alt} />
    </Styled.ImageWrapperDiv>
  )
}

type JSSwiperProps<T, U, V> = {
  items: T[]
  /** millisecond */
  duration?: number
  /** rolling interval */
  interval?: number
  stateButton?: V
  onChangeItem?: (item: T) => void
  onChangeState?: (state: 'play' | 'pause') => void
  onClick?: (e: MouseEvent<HTMLElement>, item: T) => void

  /** bug fix */
  startEffect?: 'useEffectOnce' | ((callback: React.EffectCallback, dependencyList: DependencyList | undefined) => void)
} & (
  | {
      prevButton: U
      nextButton: U
    }
  | {
      prevButton?: null
      nextButton?: null
    }
) &
  (
    | {
        width: number
        height: number
      }
    | {
        width?: never
        height?: never
      }
  )

const JSSwiper = <T extends JSSwiperData, U extends React.MutableRefObject<HTMLButtonElement | null>, V extends React.MutableRefObject<HTMLButtonElement | null>>({
  items,
  prevButton,
  nextButton,
  stateButton,
  duration = 200,
  interval = 0,
  onChangeItem: handleChangeItem = () => {},
  onChangeState: handleChangeState = () => {},
  onClick: handleClick = () => {},
  width,
  height,
  startEffect,
}: JSSwiperProps<T, U, V>) => {
  if (!items.length) return null
  if (items.length === 1) items = Array<T>(2).fill(items[0]).map<T>((item, i) => ({ ...item, order: item.order+i }))

  const initialStyle = {transform: `translate3d(0%, 0, 0)`}

  const mainEl = useRef<HTMLDivElement>(null)
  const mainWidth = useMemo(() => mainEl.current?.clientWidth || 0, [mainEl.current?.clientWidth])
  const swipeSize = useMemo(() => (mainEl.current?.clientWidth || 0) / 4, [mainEl.current?.clientWidth])

  const [item, setItem] = useState<SwiperState<T>>({visible: items[0]})
  const [style, setStyle] = useState<CSSProperties>(initialStyle)
  const [timerId, setTimerId] = useState<NodeJS.Timer>()
  const [startTime, setStartTime] = useState<number>(new Date().getTime())
  const [diff, setDiff] = useState<number>()
  const [timerBarPause, setTimerBarPause] = useState<boolean>(false)
  // const [,forceRender] = useReducer(() => ({}), {})

  // useEffect(() => {
  //   forceRender()
  // }, [prevButton, nextButton, stateButton])

  /** For mobile device */
  interface TouchData<T> {
    initX: number
    lastX?: number
    style?: CSSProperties
    prev?: T
    next?: T
  }
  const [touch, setTouch] = useState<TouchData<T>>()

  useEffect(() => setButtonEvent(prevButton, handlePrev), [item.visible, prevButton])
  useEffect(() => setButtonEvent(nextButton, handleNext), [item.visible, nextButton])

  useEffect(() => {
    const state = stateButton?.current
    if (!state) return

    const handleClick = () => (timerId ? handlePause() : handlePlay())

    state.addEventListener('click', handleClick)
    return () => state.removeEventListener('click', handleClick)
  }, [timerId, stateButton, startTime, diff])

  useEffect(() => {
    if (touch) {
      setItem(item => ({visible: item.prev ? item.prev : item.next ? item.next : item.visible}))
      setTouch(undefined)
      return
    }

    if (item.prev) {
      setStyle({transform: `translate3d(0%, 0, 0)`, transition: `transform ${duration}ms ease`})
    } else if (item.next) {
      setStyle({transform: `translate3d(-100%, 0, 0)`, transition: `transform ${duration}ms ease`})
    } else {
      setStyle(initialStyle)
    }
  }, [item])

  useEffect(() => {
    if (item.prev) {
      handleChangeState('play')
      handleChangeItem(item.prev)
    }

    if (item.next) {
      handleChangeState('play')
      handleChangeItem(item.next)
    }
  }, [item.prev, item.next])

  const setButtonEvent = (ref: U | null | undefined, handler: () => void) => {
    const el = ref?.current
    if (!el) return

    const handlerMiddleware = () => {
      setStartTime(new Date().getTime())
      handleAutoPlay()
      handler()
    }

    el.addEventListener('click', handlerMiddleware)
    return () => el.removeEventListener('click', handlerMiddleware)
  }

  let effect: typeof useEffect
  if(!startEffect) effect =useEffect
  else if(startEffect === 'useEffectOnce') effect = useEffectOnce
  else effect = startEffect

  effect(() => {
    handlePlay()
  }, [])

  useEffect(() => () => {
    clearTimeout(timerId)
    clearInterval(timerId)
  }, [timerId])

  const getIndex = (item: T) => items.findIndex(v => v.order === item.order)
  const getNeighbor = (arg: T | number) => {
    const index = typeof arg !== 'number' ? getIndex(arg) : arg
    const item = typeof arg !== 'number' ? arg : items[arg]

    const prevIndex = index === 0 ? items.length - 1 : index - 1
    const prev = items[prevIndex]

    const nextIndex = index === items.length - 1 ? 0 : index + 1
    const next = items[nextIndex]

    const visible = item

    return {prev, visible, next}
  }

  const handlePrev = () => handleBoth('prev')
  const handleNext = () => handleBoth('next')

  const handleBoth = (type: 'prev' | 'next') => {
    setStartTime(new Date().getTime())
    setStyle(type === 'next' ? initialStyle : {transform: `translate3d(-100%, 0, 0)`})
    setItem(item => ({
      ...getNeighbor(item[type] ?? item.visible),
      [type === 'prev' ? 'next' : 'prev']: undefined,
    }))
  }

  const handleAutoPlay = () => !!interval && interval > 0 && setTimerId(setInterval(handleNext, interval))
  const handleTimeoutInterval = (timeout_interval: number, interval: number) => {
    if(!interval || interval < 0) return

    setTimerId(
      setTimeout(() => {
        handleNext()
        setTimerId(setInterval(handleNext, interval))
      }, timeout_interval)
    )
  }

  const handlePlay = () => {
    if (!interval || interval < 0) return
    const continueTime = interval - (diff ?? 0)
    setStartTime(new Date().getTime() + continueTime - interval)
    setTimerBarPause(false)
    handleChangeState('play')
    handleTimeoutInterval(continueTime, interval)
  }

  const handlePause = () => {
    const diff = new Date().getTime() - startTime
    setDiff(diff)
    setTimerBarPause(true)
    handleChangeState('pause')
    clearInterval(timerId)
    setTimerId(undefined)
  }

  const handleTransitionEnd = () => {
    setItem(item => ({visible: item.prev ? item.prev : item.next ? item.next : item.visible}))
  }

  /** For mobile device */

  useEffect(() => {
    if(!mainEl.current) return

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
    }

    mainEl.current.addEventListener('touchmove', handleTouchMove)
    return () => mainEl.current?.removeEventListener('touchmove', handleTouchMove)
  }, [mainEl])

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touch) return

    handlePause()
    const posX = e.touches.item(0).clientX
    setTouch({initX: posX})
  }

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (!touch) return
      const posX = e.touches.item(0).clientX
      const state = posX - touch.initX < 0 ? 'forward' : posX === touch.initX ? 'same' : 'backward'
      let prev: T, next: T
      let additionalTransform: string = ''

      if (state === 'forward') {
        next = getNeighbor(item.visible).next
      } else if (state === 'backward') {
        prev = getNeighbor(item.visible).prev
        additionalTransform = 'translate3d(-100%, 0, 0) '
      }

      setTouch(touch => (touch ? {...touch, lastX: posX, style: {transform: additionalTransform + `translate3d(${posX - touch.initX}px, 0, 0)`}, prev, next} : undefined))
    },
    [touch]
  )

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (touch?.lastX) {
        const timingFunc = TIMINGFUNC_MAP['ease']
        let start: number
        const initX = touch.lastX - touch.initX
        const isChange = Math.abs(initX) > swipeSize
        const isNext = Math.sign(initX) < 0
        const toX = isChange ? Math.sign(initX) * mainWidth : 0

        const step: FrameRequestCallback = time => {
          if (!start) start = time
          const diff = time - start
          const percentage = Math.min(diff / duration, 1)

          setTouch(touch => {
            if (touch) {
              const defaultTransform = `translate3d(${(toX - initX) * timingFunc(percentage) + initX}px, 0, 0) `
              const additionalTransform = `translate3d(-100%, 0, 0) `
              const transform = touch.prev ? additionalTransform + defaultTransform : defaultTransform

              return {...touch, style: {transform}}
            } else {
              return undefined
            }
          })

          if (diff <= duration) {
            requestAnimationFrame(step)
          } else {
            if (isChange) {
              if (isNext) handleNext()
              else handlePrev()

              if(!!interval && interval > 0) setTimerId(setInterval(handleNext, interval))
            } else {
              handlePlay()
            }
          }
        }

        requestAnimationFrame(step)
      } else {
        setTouch(undefined)
        handlePlay()
      }
    },
    [touch]
  )

  return (
    <Styled.Container ref={mainEl} style={{width, height}}>
      {!!interval && <TimerBar interval={interval - duration - 200} initStartTime={startTime} forcePause={timerBarPause} />}
      <Styled.ImagesWrapper
        style={touch?.style ?? style}
        onTransitionEnd={handleTransitionEnd}
        /** For mobile device */
        onContextMenu={e => e.preventDefault()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {!item.prev && !!touch?.prev && <ImageWrapper key={touch.prev.order} item={touch.prev} />}
        {!!item.prev && <ImageWrapper key={item.prev.order} item={item.prev} />}
        <ImageWrapper key={item.visible.order} item={item.visible} onClick={handleClick} />
        {!!item.next && <ImageWrapper key={item.next.order} item={item.next} />}
        {!item.next && !!touch?.next && <ImageWrapper key={touch.next.order} item={touch.next} />}
      </Styled.ImagesWrapper>
    </Styled.Container>
  )
}

export default JSSwiper
