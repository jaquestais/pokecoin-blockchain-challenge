import { useRef, useReducer, useEffect } from "react";

const useReducerWithCallback = (reducer:  (state: any, action: any) => any, initialState: any, initializer?: any) => {
  const callbackRef = useRef((state: any) => { })
  const [state, dispatch] = useReducer(reducer, initialState, initializer)

  useEffect(() => {
    callbackRef.current && callbackRef.current(state)
  }, [state])

  const customDispatch = (action: any, callback: (state: any) => { }) => {
    callbackRef.current = callback
    dispatch(action)
  };

  return [state, customDispatch]
}

export default useReducerWithCallback