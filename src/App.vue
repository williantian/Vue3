<template>
  <div>导航栏 | <router-link to="/">Hello</router-link>
    | <router-link to="/xxx">Hello2</router-link>
  </div>
  <hr>
  <router-view />
</template>

<script>

export default {
  name: 'App',
}
</script>
