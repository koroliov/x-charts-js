//@flow strict
export type XChartsConstructorArgument = {
  +containerDiv: HTMLDivElement,
  +options: {
    +backgroundColor: string,
  },
}

type ComponentDatum = {
  +value: number,
  +meta: {
    +color: string,
  },
}

export interface ComponentInstance {
}

export type ComponentClass = {
  +_type: string,
  validateAddComponentArgument(
    propsToCheck: Set<string>,
    arg: AddComponentArgument,
  ): string,
  ...
}

export type AddComponentArgument = {
  +type: string,
  +zIndex: string,
  +options: {
    [string]: mixed,
  },
  +data: $ReadOnlyArray<ComponentDatum>,
}

export type Point = [number, number, number,]

export type ValidationMapperPure = {
  [string]: (arg: mixed) => string,
}
