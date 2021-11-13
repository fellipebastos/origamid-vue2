<template>
  <div id="app">
    <TheHeader />
    <main>
      <transition>
        <router-view />
      </transition>
    </main>
    <TheFooter />
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";

export default {
  components: {
    TheHeader,
    TheFooter,
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #345;
  background: url("./assets/pattern.svg") repeat top;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}

ul {
  list-style: none;
}

a {
  color: #345;
  text-decoration: none;
}

img {
  max-width: 100%;
  display: block;
}

.btn {
  display: block;
  padding: 10px 30px;
  background: #87f;
  border: none;
  border-radius: 4px;
  color: #fff;
  text-align: center;
  font-size: 1rem;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.2);
  transition: all 0.3s;
  cursor: pointer;
}

.btn:hover:not(:disabled) {
  background: #65d;
  transform: scale(1.1);
}

.btn:disabled {
  background: #bbc;
}

label {
  margin-bottom: 5px;
}

input,
textarea {
  border-radius: 4px;
  border: 1px solid #fff;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  transition: all 0.3s;
  font-size: 1rem;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

input:focus,
input:hover,
textarea:focus,
textarea:hover {
  outline: none;
  transform: scale(1.1);
  box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
  border-color: #87f;
}

.v-enter,
.v-leave-to {
  opacity: 0;
}

.v-enter {
  transform: translate3d(0, -20px, 0);
}

.v-leave-to {
  transform: translate3d(0, 20px, 0);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.3s;
}
</style>
