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

export interface Component {
}

export type AddComponentArgument = {
  +type: string,
  +zIndex: string,
  +options: {},
  +data: $ReadOnlyArray<ComponentDatum>,
}
