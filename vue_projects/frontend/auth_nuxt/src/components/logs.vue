<template lang="pug">
.q-pa-md.flex.flex-center.full-width
  q-card.q-pa-lg.rounded-borders.shadow-2(style="max-width: 1000px; width: 100%")
    q-card-section
      .text-h4.q-mb-md(:style="{color: appColor.secondary, fontWeight:'bold'}") User Logs
      .text-subtitle1.text-grey-6.q-mb-lg All user activity logs.

      q-input(
        v-model="vm.searchLocal"
        placeholder="Search by name, phone..."
        dense
        outlined
        debounce="300"
        clearable
        @update:model-value="onSearch"
      )
        template(v-slot:prepend)
          q-icon(name="search")

    q-intersection(
      once
      transition="fade"
      @enter="vm.reset"
      style="width: 100%;"
    )
      .flex.flex-center.full-width.q-py-xl(v-if="vm.loading && vm.items.length === 0")
        q-spinner-dots(size="50px" color="primary")

      .q-my-md.text-red-6.text-center.text-body2(v-else-if="vm.error")
        | {{ vm.error }}

      q-table(
        v-else
        :rows="vm.items"
        :columns="columns"
        row-key="id"
        flat
        bordered
        :loading="vm.loading"
        binary-state-sort
        :pagination="{ sortBy: vm.sortBy, descending: vm.sortOrder === 'desc' }"
        @request="onRequest"
        style="max-height: 300px;"
      )
        template(v-slot:body="props")
          q-tr(:props="props")
            q-td(v-for="col in props.cols" :key="col.name" :props="props")
              | {{ props.row[col.field] }}

      q-infinite-scroll(
        :offset="10"
        @load="loadMore"
        :disable="vm.loading || vm.page >= vm.totalPages"
      )
        template(v-slot:loading)
          .row.justify-center.q-my-md
            q-spinner(color="primary")
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import LogsViewModel from '~/viewmodels/LogsViewModel'
import { useAppColors,useAppLanguage } from'~/composables/useProperties'

const appColor = useAppColors()
const vm = reactive(new LogsViewModel())

const columns = [
  { name: 'id', label: 'ID', field: 'id', sortable: true },
  { name: 'action', label: 'Action', field: 'action', sortable: true },
  {
    name: 'logged_at',
    label: 'Timestamp',
    field: 'logged_at',
    sortable: true,
    format: val => new Date(val).toLocaleString()
  },
  { name: 'user_name', label: 'User Name', field: 'user_name' },
  { name: 'user_email', label: 'User Email', field: 'user_email' }
]

function onSearch () {
  vm.setFilters({ search: vm.searchLocal })
}

function onRequest (props) {
  const { sortBy, descending } = props.pagination
  vm.setSort(sortBy, descending ? 'desc' : 'asc')
}

async function loadMore (index, done) {
  await vm.fetch({ page: vm.page + 1 })
  done()
}

onMounted(() => vm.fetch())
</script>
