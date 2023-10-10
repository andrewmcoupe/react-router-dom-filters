import React from 'react'
import { renderHook, act } from '@testing-library/react'
import { createFiltersHook } from '.'
import { BrowserRouter } from 'react-router-dom'
import { PropsWithChildren } from 'react'

const useFilters = createFiltersHook(['filter1', 'filter2'])
const wrapper = ({ children }: PropsWithChildren) => (
  <BrowserRouter>{children}</BrowserRouter>
)

describe('createFiltersHook', () => {
  it('should remove filter when updateFilters is called with an empty value', () => {
    const { result } = renderHook(() => useFilters(), {
      wrapper,
    })

    act(() => {
      result.current.updateFilters({ key: 'filter1', value: 'value1' })
    })

    expect(result.current.activeFilters.filter1).toBe('value1')
    expect(result.current.hasSearchParams).toBe(true)

    act(() => {
      result.current.updateFilters({ key: 'filter1', value: '' })
    })

    expect(result.current.activeFilters.filter1).toBe('')
    expect(result.current.hasSearchParams).toBe(false)
  })

  it('should initialize with empty filters', () => {
    const { result } = renderHook(() => useFilters(), {
      wrapper,
    })

    expect(result.current.activeFilters).toEqual({ filter1: '', filter2: '' })
    expect(result.current.hasSearchParams).toBe(false)
  })

  it('should update filters when updateFilters is called', () => {
    const { result } = renderHook(() => useFilters(), {
      wrapper,
    })

    act(() => {
      result.current.updateFilters({ key: 'filter1', value: 'value1' })
    })

    expect(result.current.activeFilters.filter1).toBe('value1')
    expect(result.current.hasSearchParams).toBe(true)

    act(() => {
      result.current.updateFilters({ key: 'filter2', value: 'value2' })
    })

    expect(result.current.activeFilters.filter2).toBe('value2')
    expect(result.current.hasSearchParams).toBe(true)
  })
})
