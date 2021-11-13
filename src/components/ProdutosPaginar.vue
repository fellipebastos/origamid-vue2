<template>
  <ul v-if="paginasTotal > 1">
    <li v-for="pagina in paginas" :key="pagina">
      <router-link :to="{ query: query(pagina) }">
        {{ pagina }}
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: "ProdutosPaginar",
  props: {
    porPagina: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 1,
    },
  },
  methods: {
    query(pagina) {
      return {
        ...this.$route.query,
        _page: pagina,
      };
    },
    getVisiblePagesQuantity(length) {
      return Array.from({ length }, (_, i) => i + 1);
    },
  },
  computed: {
    paginas() {
      const current = this.$route.query._page;
      const range = 9;
      const offset = Math.ceil(range / 2);
      const pageList = this.getVisiblePagesQuantity(this.paginasTotal);

      pageList.splice(0, current - offset);
      pageList.splice(range, this.paginasTotal);

      return pageList;
    },
    paginasTotal() {
      const result = this.total / this.porPagina;
      return result !== Infinity ? Math.ceil(result) : 0;
    },
  },
};
</script>

<style scoped>
ul {
  grid-column: 1 / -1;
}

li {
  display: inline-block;
}

li a {
  padding: 2px 8px;
  border-radius: 2px;
  margin: 4px;
}

li a.router-link-exact-active,
li a:hover {
  background: #87f;
  color: #fff;
}
</style>
