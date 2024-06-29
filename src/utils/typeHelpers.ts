export const ObjectKeys = <Obj extends NonNullable<unknown>>(
  obj: Obj
): (keyof Obj)[] => {
  return Object.keys(obj) as (keyof Obj)[]
}
