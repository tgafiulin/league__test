<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'App',
  mounted() {
    const url = "http://b99960se.beget.tech/json/libraries.json";
    fetch(url)
      .then(response => response.json())
      .then(json => {
        this.$store.dispatch('setLibraries', json);
        this.$store.dispatch('finishLoading');
      })
  }
}
</script>
