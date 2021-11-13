<template>
  <section>
    <div>
      <h2>Vendas</h2>

      <div
        class="produtos-wrapper"
        v-for="(venda, index) in vendas"
        :key="index"
      >
        <ProdutoItem v-if="venda.produto" :produto="venda.produto">
          <p class="vendedor"><span>Comprador</span> {{ venda.vendedor_id }}</p>
        </ProdutoItem>
        <div class="entrega">
          <h3>Entrega:</h3>

          <ul v-if="venda.endereco">
            <li v-for="(value, key) in venda.endereco" :key="key">
              {{ key }}: {{ value }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import { api } from "@/services.js";
import ProdutoItem from "@/components/ProdutoItem.vue";

export default {
  name: "UsuarioVendas",
  components: {
    ProdutoItem,
  },
  data() {
    return {
      vendas: null,
    };
  },
  computed: {
    ...mapState(["usuario", "login"]),
  },
  methods: {
    getVendas() {
      api
        .get("transacao", {
          params: {
            vendedor_id: this.usuario.id,
          },
        })
        .then(({ data }) => {
          this.vendas = data;
        });
    },
  },
  watch: {
    login() {
      this.getVendas();
    },
  },
  created() {
    if (this.login) {
      this.getVendas();
    }
  },
};
</script>

<style scoped>
.produto-wrapper {
  margin-bottom: 40px;
}

.vendedor span {
  color: #e80;
}

h2 {
  margin-bottom: 20px;
}

.entrega {
  display: grid;
  grid-template-columns: minmax(100px, 200px) 1fr;
  gap: 20px;
  margin-bottom: 60px;
}

h3 {
  margin: 0;
  justify-self: end;
}
</style>
