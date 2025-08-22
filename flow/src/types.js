//@flow strict
export type XChartsConstructorArgument = {
  +containerDiv: HTMLDivElement,
  +options: {
    +backgroundColor: string,
    +isComponentInspectMode: boolean,
  },
}

export type ComponentDatum = {
  +value: number,
  +meta: {
    +color: string,
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
  +options: {
    [string]: mixed,
  },
  +data: $ReadOnlyArray<ComponentDatum>,
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
