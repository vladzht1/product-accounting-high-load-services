import { Pageable } from "shared";

export interface ReadRepository<T, K> {
  findAll<F>(pagination: Pageable, filters?: F): Promise<T[]>;
  findById(id: K): Promise<T | null>;
  count<F>(filters?: F): Promise<number>;
}

export interface CreateRepository<T> {
  save(entity: T): Promise<T>;
}

export interface UpdateRepository<T> {
  update(entity: T): Promise<T>;
}

export interface DeleteRepository<T, K> {
  delete(entity: T): Promise<void>;
  deleteById(id: K): Promise<void>;
}
