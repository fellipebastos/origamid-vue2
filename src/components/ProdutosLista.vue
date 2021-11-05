<template>
  <section class="produtos-container">
    <transition mode="out-in">
      <div v-if="produtos && produtos.length" class="produtos" key="produtos">
        <div v-for="produto in produtos" :key="produto.id" class="produto">
          <router-link :to="{ name: 'produto', params: { id: produto.id } }">
            <img
              v-if="produto.fotos"
              :src="produto.fotos[0].src"
              :alt="produto.fotos[0].titulo"
            />
            <p class="preco">{{ produto.preco | numeroPreco }}</p>
            <h2 class="titulo">{{ produto.nome }}</h2>
            <p>{{ produto.descricao }}</p>
          </router-link>
        </div>

        <ProdutosPaginar
          :total="produtosTotal"
          :porPagina="produtosPorPagina"
        />
      </div>

      <div v-else-if="produtos && !produtos.length" key="sem-resultado">
        <p class="sem-resultados">
          Busca sem resultados. Tente buscar outro termo.
        </p>
      </div>

      <PaginaCarregando v-else key="carregando" />
    </transition>
  </section>
</template>

<script>
import api from "@/services.js";

import ProdutosPaginar from "@/components/ProdutosPaginar.vue";

export default {
  name: "ProdutosLista",
  components: { ProdutosPaginar },
  data() {
    return {
      produtos: null,
      produtosTotal: 0,
      produtosPorPagina: 9,
    };
  },
  computed: {
    query() {
      return {
        _limit: this.produtosPorPagina,
        ...this.$route.query,
      };
    },
  },
  methods: {
    getProdutos() {
      this.produtos = null;

      api.get("/produto", { params: this.query }).then((r) => {
        this.produtosTotal = Number(r.headers["x-total-count"]);
        this.produtos = r.data;
      });
    },
  },
  watch: {
    query() {
      this.getProdutos();
    },
  },
  created() {
    this.getProdutos();
  },
};
</script>

<style scoped>
.produtos-container {
  max-width: 1000px;
  margin: 0 auto;
}

.produtos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin: 30px;
}

.produto {
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  padding: 10px;
  background: #fff;
  border-radius: 4px;
  transition: all 0.2s;
}

.produto:hover {
  box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
  transform: scale(1.1);
  position: relative;
  z-index: 1;
}

.produto img {
  border-radius: 4px;
  margin-bottom: 20px;
}

.titulo {
  margin-bottom: 10px;
}

.preco {
  color: #e80;
  font-weight: bold;
}

.sem-resultados {
  text-align: center;
}
</style>
