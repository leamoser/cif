<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="$store.dispatch('getCode')">Inhalt holen</button>
  </div>
</template>
