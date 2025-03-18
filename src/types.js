//@flow strict
export type XChartsConfig = {
  containerDiv: HTMLDivElement,
  options: {
    backgroundColor: string,
  },
}

type ComponentDatum = {
  value: number,
  meta: { color: string, }
}

export interface Component {
}

export type AddComponentConfig = {
  type: string,
  options: {},
  zIndex: string,
  data: {} | [],
}
