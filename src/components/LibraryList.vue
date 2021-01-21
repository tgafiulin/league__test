<template>
  <div>
    <table>
      <thead>
        <tr>
          <th @click="$emit('sort', 'id')" :class="[(sortParam === 'id') ? 'sort--increase' : '', {'sort--decrease': sortIncrease}]">ID</th>
          <th @click="$emit('sort', 'name')" :class="[(sortParam === 'name') ? 'sort--increase' : '', {'sort--decrease': sortIncrease}]">Название</th>
          <th @click="$emit('sort', 'address')"  :class="[(sortParam === 'address') ? 'sort--increase' : '', {'sort--decrease': sortIncrease}]">Адрес</th>

            <!-- <th @click="$emit('filter', 'id')" class="sort" :class="[(sortParam === 'id') ? sortIncrease : '', {sortIncrease: sort__increase}]">ID</th>
          <th @click="$emit('filter', 'name')" class="sort" :class="[(sortParam === 'name') ? sortIncrease : '']">Название</th>
          <th @click="$emit('filter', 'address')" class="sort" :class="[(sortParam === 'address') ? sortIncrease : '']">Адрес</th> -->
        </tr>
      </thead>
      <tbody>
        <LibraryItem 
          v-for="(library, i) of libraries"
          v-bind:library="library"
          v-bind:index="i"
          v-bind:key="library.id"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import LibraryItem from '@/components/LibraryItem'
export default {
  props: ['libraries', 'sortParam', 'sortIncrease'],
  components: {
    LibraryItem
  }
}
</script>

<style scoped>
  table {
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.9em;
    font-family: sans-serif;
    min-width: 400px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    min-width: 500px;
  }

  thead tr {
    background-color: #009879;
    color: #ffffff;
    text-align: left;
  }

  th {
    background: url('../assets/images/sort.png') no-repeat top 15px right 8px;
    background-size: 10px 10px;
    padding: 0 25px 10px 10px;
    padding: 12px 15px;
  }

  .sort--increase {
    background-image: url('../assets/images/arr_down.png');
    background-size: 10px 5px;
  }

  .sort--increase.sort--decrease {
    background-image: url('../assets/images/arr_up.png');
  }
</style>