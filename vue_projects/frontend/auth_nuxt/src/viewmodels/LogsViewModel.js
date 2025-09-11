import { useNuxtApp } from '#app'

export default class LogsViewModel {
  constructor() {
    this.items = []
    this.total = 0
    this.page = 1
    this.limit = 10 
    this.totalPages = 1

    this.search = ''
    this.action = ''
    this.startDate = ''
    this.endDate = ''
    this.sortBy = 'logged_at'
    this.sortOrder = 'desc'

    this.searchLocal = ''
    this.loading = false
    this.error = null
  }

  _buildParams(overrides = {}) {
    return {
      page: overrides.page ?? this.page,
      limit: overrides.limit ?? this.limit,
      sortBy: overrides.sortBy ?? this.sortBy,
      sortOrder: overrides.sortOrder ?? this.sortOrder,
      search: overrides.search ?? this.search,
      action: overrides.action ?? this.action,
      startDate: overrides.startDate ?? this.startDate,
      endDate: overrides.endDate ?? this.endDate,
    }
  }

  async fetch(overrides = {}) {
    const { $api } = useNuxtApp()
    this.loading = true
    this.error = null

    try {
      const params = this._buildParams(overrides)
      const token = localStorage.getItem('token')
      const response = await $api.get('/logs', {
        params,
        headers: { Authorization: `Bearer ${token}` }
      })
      const payload = response.data

      // If fetching next page, append items
      if (params.page > 1) {
        this.items = [...this.items, ...payload.data]
      } else {
        this.items = payload.data || []
      }

      this.total = payload.total || 0
      this.page = payload.page || 1
      this.limit = payload.limit || this.limit
      this.totalPages = payload.totalPages || 1
    } catch (err) {
      console.error('Logs fetch error', err)
      this.error = err?.response?.data?.error || err.message
    } finally {
      this.loading = false
    }
  }

  async setSort(sortBy, sortOrder) {
    this.sortBy = sortBy
    this.sortOrder = sortOrder
    this.page = 1
    await this.fetch({ page: 1, sortBy, sortOrder })
  }

  async setFilters({ search, action, startDate, endDate }) {
    this.search = search ?? this.search
    this.action = action ?? this.action
    this.startDate = startDate ?? this.startDate
    this.endDate = endDate ?? this.endDate
    this.page = 1
    await this.fetch({ page: 1 })
  }
}
