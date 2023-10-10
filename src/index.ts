import { useCallback, useMemo } from 'react'
import { useSearchParams, createSearchParams } from 'react-router-dom'

type FilterKeysToObject<T extends readonly string[]> = {
  [K in T[number]]: string
}

/**
 * @description - A function that returns a type-safe hook to manage filters in the URL. Add the as const modifier to the array of filter keys to ensure type safety.
 * @example
 *
 * const useFilters = createFiltersHook(['sortBy', 'isEditable']);
 * const { activeFilters, updateFilters } = useFilters();
 * updateFilters({ key: 'sortBy', value: 'name' });
 *                         👆 You will get autocomplete for the filter keys ✨
 *
 */
export const createFiltersHook = <const T extends readonly string[]>(
  filterKeys: T
) => {
  return () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const activeFilters = useMemo(
      () =>
        filterKeys.reduce(
          (acc, filter) => ({
            ...acc,
            [filter]: searchParams.get(filter) ?? '',
          }),
          {} as FilterKeysToObject<T>
        ),
      [searchParams]
    )

    const setFilters = useCallback(
      (newFilters: Record<string, string>) => {
        const newSearchParams = createSearchParams(searchParams)

        Object.entries(newFilters).forEach(([key, value]) => {
          if (value) {
            newSearchParams.set(key, value)
          } else {
            // if value is falsy, remove the key from the search params
            newSearchParams.delete(key)
          }
        })

        setSearchParams(newSearchParams)
      },
      [searchParams, setSearchParams]
    )

    const updateFilters = useCallback(
      ({ key, value }: { key: keyof FilterKeysToObject<T>; value: string }) => {
        if (value === '') {
          setFilters({ [key]: '' })
          return
        }

        if (activeFilters[key].includes(value)) {
          const newFilterValues = activeFilters[key]
            .split(',')
            .filter((i) => i !== value)
            .join(',')

          setFilters({ [key]: newFilterValues })
        } else {
          const newFilterValues =
            activeFilters[key].length === 0
              ? value
              : `${activeFilters[key]},${value}`

          setFilters({ [key]: newFilterValues })
        }
      },
      [activeFilters, setFilters]
    )

    const hasSearchParams = Object.values(activeFilters).some(Boolean)

    return { activeFilters, updateFilters, hasSearchParams }
  }
}
