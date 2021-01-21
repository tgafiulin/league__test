<template>
  <div>
    <h2>Библиотеки</h2>
    <hr>
    <Loader v-if="loading" />
    <template v-else>
      <div class="filter">
        <input type="text" id="address" placeholder="фильтр по адресу" v-model="libraryFilter">
        <label for="address">Адрес</label>
      </div>
      <div class="libraries-table">
      <LibraryList
        v-bind:libraries="trimList"
        v-on:sort="sort"
        v-bind:sortIncrease="sortIncrease"
        v-bind:sortParam="sortParam"
      />
      </div>

      <button class="more-btn" @click="page += 1" v-if="trimList.length === page * quantity">Загрузить еще</button>
    </template>
  </div>
</template>

<script>
import LibraryList from '@/components/LibraryList';
import Loader from '@/components/Loader';

export default {
  name: 'Home',
  data() {
    return {
      // libraries: this.$store.libraries,
      page: 1,
      quantity: 15,
      // loading: true,
      sortParam: 'name',
      sortIncrease: true,
      libraryFilter: ''
    }
  },
  methods: {
    sort: function (field) {
      if (this.sortParam === field) {
        this.sortIncrease = !this.sortIncrease;
      } else {
        this.sortParam = field;
        this.sortIncrease = true;
      }
    }
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    },
    libraries() {
      return this.$store.state.libraries;
    },
    sortedList () {
      let clone = this.libraries;
      let sortIncrease = this.sortIncrease;
      switch(this.sortParam){
          case 'name': return clone.sort(function (d1, d2) {
            let sort = (d1.data.general.name.trim().toLowerCase() > d2.data.general.name.trim().toLowerCase()) ? 1 : -1;
            if (!sortIncrease) {
              sort *= (-1)
            }
            return sort;
          });
          case 'address': return clone.sort(function (d1, d2) {
            let sort = (d1.data.general.address.fullAddress.trim().toLowerCase() > d2.data.general.address.fullAddress.trim().toLowerCase()) ? 1 : -1;
            if (!sortIncrease) {
              sort *= (-1)
            }
            return sort;
          });
          case 'id': return clone.sort(function (d1, d2) {
            let sort = (d1.data.general.id > d2.data.general.id) ? 1 : -1;
            if (!sortIncrease) {
              sort *= (-1)
            }
            return sort;
          });
          default: return clone;
      }
    },
    filteredList: function(){
      let library = this.libraryFilter;
      return this.sortedList.filter(function (elem) {
          if(library === '') return true;
          else return elem.data.general.address.fullAddress.toLowerCase().indexOf(library.toLowerCase()) > -1;
      })
    },
    trimList: function () {
      return this.filteredList.slice(0, this.page * this.quantity)
    }
  },
  components: {
    LibraryList, Loader
  }
}
</script>

<style lang="scss">
  .more-btn {
    text-decoration: none;
    display: inline-block;
    padding: 12px 40px;
    margin: 10px 20px 30px;
    border-radius: 30px;
    background-image: linear-gradient(45deg, #7AB893 0%, #009879 100%);
    background-position: 100% 0;
    background-size: 200% 200%;
    font-family: 'Montserrat', sans-serif;
    font-size: 24px;
    font-weight: 300;
    color: white;
    box-shadow: 0 16px 32px 0 rgba(#7AB893, .35);
    transition: .5s;
    outline: none;
  }
  .more-btn:hover {
    box-shadow: 0 0 0 0 rgba(#7AB893, 0);
    background-position: 0 0;
  }

  input {
    display: inline-block;
    max-width: 300px;
    width: 100%;
    padding: 10px 0 10px 15px;
    font-family: "Open Sans", sans;
    font-weight: 400;
    color: #377D6A;
    background: #efefef;
    border: 0;
    border-radius: 3px;
    outline: 0;
    text-indent: 70px; // Arbitrary.
    transition: all .3s ease-in-out;
    
    &::-webkit-input-placeholder {
      color: #efefef;
      text-indent: 0;
      font-weight: 300;
    }

    + label {
      display: inline-block;
      position: absolute;
      top: 0;
      left: 0;
      padding: 10px 15px;
      text-shadow: 0 1px 0 rgba(19,74,70,.4);
      background: #009879;
      color: #fff;
      transition: all .3s ease-in-out;
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
    }
  }

  .libraries-table {
    overflow-x: auto;
  }

  .filter {
    position: relative;
  }
</style>
