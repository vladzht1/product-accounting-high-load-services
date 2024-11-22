type SingleSearchFunction = (value: any) => any;
type DoubleSearchFunction = (left: any, right: any) => any;

type Predicates = {
  moreThanOrEqual: SingleSearchFunction,
  lessThanOrEqual: SingleSearchFunction,
  between: DoubleSearchFunction
}

type FilterOptions = {
  removeObjectFilters?: boolean

  /**
   * If set to `true`, translates `shopId = 5` to:
   * ```
   * {
   *    relations: {
   *       shop: true
   *    },
   *    filters: {
   *       shop: {id: 5}
   *    }
   * }
   * ```
   */
  unwrapId?: boolean,
}

export const prepareFiltersForTypeORM = <F extends object>(filters: F, predicates?: Predicates, options: FilterOptions = {
  removeObjectFilters: false,
  unwrapId: true
}): { relations: any, filters: any } => {
  const relations: any = {};
  const normalizedFilters: any = {};

  console.log("Input:", filters);

  for (let key of Object.keys(filters)) {
    const value: any = filters[key as keyof F];
    let result: any = {};

    // Cannot process arrays, skip
    if (Array.isArray(value)) {
      continue;
    }

    if (typeof value !== "object") {
      // Having filter like `{ shopId: 5 }` we should translate it to:
      // relations: { shop: true }
      // filters: { shop: { id: 5 } }
      if (options.unwrapId && key.toLowerCase().endsWith("id")) {
        key = key.slice(0, key.length - 2);
        relations[key] = true;

        result = {
          id: value
        }
      }

      // Plain value, just set the key-value pairs
      else {
        result = value;
      }
    }

    // Handle filters like this:
    // {
    //   age: {min: 18, max: 35}
    // }
    //
    // In case if we only have `min` value, the filter will be: {min: [value], max: Infinity}.
    // In case if we only have `max` value, the filter will be: {min: Infinity, max: [value]}.
    //
    // Both `min` and `max` are inclusive
    else if (predicates && (value.min || value.max)) {
      if (value.min && !value.max) {
        result = predicates.moreThanOrEqual(value.min);
      } else if (value.max && !value.min) {
        result = predicates.lessThanOrEqual(value.max);;
      } else {
        result = predicates.between(value.min, value.max);
      }
    }

    // If the queried key is object, the key of the object should be the name of the inner relation.
    // To query with respect to it, we need to add the relation to query.
    // https://orkhan.gitbook.io/typeorm/docs/find-options
    else if (!options.removeObjectFilters && !new Date(value)) {
      relations[key] = true;
      result = value;
    }

    normalizedFilters[key] = result;
  }

  console.log("Output:", { relations, filters });

  return { relations, filters: normalizedFilters };
}
