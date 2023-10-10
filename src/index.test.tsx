import React from 'react'
import { renderHook, act } from '@testing-library/react'
import { createFiltersHook } from '.'
import { BrowserRouter } from 'react-router-dom'
import { PropsWithChildren } from 'react'

const createRandomString = () => Math.random().toString(36).substring(7)

const wrapper = ({ children }: PropsWithChildren) => (
  <BrowserRouter>{children}</BrowserRouter>
)

describe('createFiltersHook', () => {
  it('should remove filter when updateFilters is called with an empty value', () => {
    const key1 = createRandomString()
    const key2 = createRandomString()
    const useFilters = createFiltersHook([key1, key2])
    const { result } = renderHook(() => useFilters(), {
      wrapper,
    })

    act(() => {
      result.current.updateFilters({ key: key1, value: 'value1' })
    })

    expect(result.current.activeFilters[key1]).toBe('value1')
    expect(result.current.hasSearchParams).toBe(true)

    act(() => {
      result.current.updateFilters({ key: key1, value: '' })
    })

    expect(result.current.activeFilters[key1]).toBe('')
    expect(result.current.hasSearchParams).toBe(false)
  })

  it('should initialize with empty filters', () => {
    const key1 = createRandomString()
    const key2 = createRandomString()
    const useFilters = createFiltersHook([key1, key2])
    const { result } = renderHook(() => useFilters(), {
      wrapper,
    })

    expect(result.current.activeFilters).toEqual({ [key1]: '', [key2]: '' })
    expect(result.current.hasSearchParams).toBe(false)
  })

  it('should update filters when updateFilters is called', () => {
    const key1 = createRandomString()
    const key2 = createRandomString()
    const useFilters = createFiltersHook([key1, key2])
    const { result } = renderHook(() => useFilters(), {
      wrapper,
    })

    act(() => {
      result.current.updateFilters({ key: key1, value: 'value1' })
    })

    expect(result.current.activeFilters[key1]).toBe('value1')
    expect(result.current.hasSearchParams).toBe(true)

    act(() => {
      result.current.updateFilters({ key: key2, value: 'value2' })
    })

    expect(result.current.activeFilters[key2]).toBe('value2')
    expect(result.current.hasSearchParams).toBe(true)
  })

  it('should reset the search params when invoking reset', () => {
    const key1 = createRandomString()
    const key2 = createRandomString()
    const useFilters = createFiltersHook([key1, key2])
    const { result } = renderHook(() => useFilters(), {
      wrapper,
    })

    act(() => {
      result.current.updateFilters({ key: key1, value: 'value1' })
    })

    expect(result.current.activeFilters[key1]).toBe('value1')
    expect(result.current.hasSearchParams).toBe(true)

    act(() => {
      result.current.resetFilters()
    })

    expect(result.current.hasSearchParams).toBe(false)
  })
})
