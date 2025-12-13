//@flow strict
export type XChartsJsConstructorArgument = {
  +containerDiv: HTMLDivElement,
  +options: {
    +backgroundColor: string,
    +isComponentInspectMode: boolean,
  },
}

export interface ComponentInstance {
}

export type ComponentClass = {
  +_type: string,
  validateAddMethodArgument(
    arg: {
      [string]: mixed,
    },
  ): string,
  ...
}

export type AddMethodArgument = {
  +type: string,
  +zIndex: string,
  [string]: mixed,
}

export type Point = [number, number, number,]

export type ValidationDictionaryPure = {
  [string]: (arg: mixed) => string,
}

export type ValidationDictionary = {
  [string]:
    ((arg: mixed) => string) |
    ValidationDictionaryPure |
    [ ValidationDictionary, ],
}

export type PureObject = { [string]: mixed, } |
  { [string]: mixed, __proto__: null, }
