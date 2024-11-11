import { type Ref, ref } from 'vue'

type ModelSettings<T> = {
  [key in keyof T]: ModelSetting
}

interface ModelSetting {
  type: ModelTypes
  default: string | number | boolean | null | undefined
}

type ModelTypes = Array<ModelType> | ModelType
type ModelType = StringConstructor | NumberConstructor | BooleanConstructor | null | undefined

type RefInferType<T> =
  T extends Array<infer P>
    ? P extends new (...args: any) => any
      ? Primitives<InstanceType<P>>
      : P
    : T extends new (...args: any) => any
      ? Primitives<InstanceType<T>>
      : T

type Primitives<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : any

export function useModel<T extends ModelSettings<T>>(
  settings: T,
): {
  [key in keyof T]: Ref<RefInferType<T[key]['type']>>
} & {
  clear: () => void
} {
  const obj: any = {}
  for (const key in settings) {
    obj[key] = ref(settings[key].default)
  }

  function clear() {
    for (const key in obj) {
      obj[key].value = settings[key as keyof ModelSettings<T>].default
    }
  }

  return { ...obj, clear }
}
