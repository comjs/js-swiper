import React from 'react'

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

const useEffectOnce = (cb: React.EffectCallback, deps: React.DependencyList | undefined) => {
  console.log(process.env.NODE_ENV)
  const ref = React.useRef<boolean>(!isDev)

  React.useEffect(() => {
    console.log(ref.current)
    if(!ref.current) {
      ref.current = true
      return undefined
    }

    return cb()
  }, deps)
}

export default useEffectOnce