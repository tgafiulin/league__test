<template>
  <tr>
    <td>{{ library.data.general.id }}</td>
    <td><router-link :to="{name: 'Library', params: {id: library.nativeId, library: library.data.general}}">{{ library.nativeName }}</router-link></td>
    <td>{{ library.data.general.address.fullAddress }}</td>
  </tr>
</template>

<script>
export default {
   props: {
    library: {
      type: Object,
      required: true
    },
    index: Number
  },
}
</script>

<style lang="scss">
  tr {
    border-bottom: 1px solid #dddddd;
  }

  tr:nth-of-type(even) {
    background-color: #f3f3f3;
  }

  tr:last-of-type {
    border-bottom: 2px solid #009879;
  }

  td {
    padding: 12px 15px;
  }
</style>