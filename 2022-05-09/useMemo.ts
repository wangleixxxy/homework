/**
 * 实现React useMemo原理
 */
let memoizedState = null;

function useMemo(nextCreate, deps) {
  if (memoizedState) {
    let [lastValue, lastDeps] = memorizedState;
    // 依赖是否改变
    let changed = !deps.every((dep, index) => {
      return dep === lastDeps[index];
    });
    // 有改变就重新计算
    if (changed) {
      const nextValue = nextCreate();
      memoizedState = [nextValue, deps];
      return nextValue;
    } else {
      // 无改变，直接返回上次的值
      return lastValue;
    }
  } else {
    const nextDeps = deps === undefined ? null : deps;
    const nextValue = nextCreate();
    memoizedState = [nextValue, nextDeps];
    return nextValue; // 返回值
  }
}

/*
let hooksList = [];
let hooksIndex = 0;
function useMemo(fn,deps){
    if(!deps) return fn();
    if(hooksList.length>0){
        let last = hooksList[hooksIndex-1];
        let same = last[1].every((item,index)=>item === deps[index]);
        if(same){
            return last[0];
        }else{
            let result = fn();
            hooksList[hooksIndex++] = [result,deps];
            return result
        }
    }else{
        let result = fn();
        hooksList[hooksIndex++] = [result,deps];
        return result
    }
}
*/
// function mountMemo<T>(
//   nextCreate: () => T,
//   deps: Array<mixed> | void | null
// ): T {
//   const hook = mountWorkInProgressHook();
//   const nextDeps = deps === undefined ? null : deps;
//   const nextValue = nextCreate();
//   hook.memoizedState = [nextValue, nextDeps];
//   return nextValue;
// }

// function updateMemo<T>(
//   nextCreate: () => T,
//   deps: Array<mixed> | void | null
// ): T {
//   const hook = updateWorkInProgressHook();
//   const nextDeps = deps === undefined ? null : deps;
//   const prevState = hook.memoizedState;
//   if (prevState !== null) {
//     // Assume these are defined. If they're not, areHookInputsEqual will warn.
//     if (nextDeps !== null) {
//       const prevDeps: Array<mixed> | null = prevState[1];
//       if (areHookInputsEqual(nextDeps, prevDeps)) {
//         return prevState[0];
//       }
//     }
//   }
//   const nextValue = nextCreate();
//   hook.memoizedState = [nextValue, nextDeps];
//   return nextValue;
// }
