//@flow strict
export type XChartsConstructorArgument = {
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
  validateXChartsAddMethodArgument(
    arg: {
      [string]: mixed,
    },
  ): string,
  ...
}

export type XChartsAddMethodArgument = {
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
