import { type Ref, ref } from 'vue'

type ModelSettings<T extends object> = {
  [key in keyof T]: ModelSetting<T[key]>
}

interface ModelSetting<T = unknown> {
  default?: T
  schema?: string
}

type ModelReturn<T extends object> = {
  [key in keyof T]: Ref<T[key]>
} & {
  clear: () => void
}

export function useModel<T extends object>(settings: ModelSettings<T>): ModelReturn<T> {
  const obj: { [key in keyof T]: Ref } = {} as { [key in keyof T]: Ref }
  for (const key in settings) {
    obj[key] = ref(settings[key].default)
  }

  function clear() {
    for (const key in obj) {
      obj[key].value = settings[key].default
    }
  }

  return { ...obj, clear }
}
