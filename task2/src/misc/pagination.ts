export const DEFAULT_PER_PAGE = 50;

export interface Pageable {
  page: number;
  limit: number;
}

export interface Page<T> {
  payload: T[],
  page: number,
  perPage: number,
  totalPages: number
}

export const normalizePageable = (pagination?: Partial<Pageable>): Pageable => {
  const page = pagination && pagination.page || 1;
  const limit = pagination && pagination.limit || DEFAULT_PER_PAGE;

  return { page, limit };
}

export const createPage = <T>(payload: T[], pageable: Pageable, totalAmount: number): Page<T> => {
  return {
    payload,
    page: pageable.page,
    perPage: pageable.limit,
    totalPages: Math.ceil(totalAmount / pageable.limit)
  }
}
