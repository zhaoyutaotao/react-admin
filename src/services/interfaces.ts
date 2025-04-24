export interface IResponse<T> {
  [x: string]: any
  code: number
  message: string
  data: T
  time: number
}

export interface IPageData<T> {
  current: number
  pages: number
  records: T[]
  data: T[]
  size: number
  total: number
}
