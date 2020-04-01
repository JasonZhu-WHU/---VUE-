<template>
  <div>
    <h>BooksStatistics</h>
    <ul id="example-2">
      <li v-for="(item, index) in row1_books" :key="index">
        {{ item.title }} - {{ index }} - {{ item.isbn }}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        row1_books: [{
          title: '?',
          isbn: 0
        }],
        row2_books: [],
        row3_books: [],
      };
    },
  }
</script>

<style>
</style>
