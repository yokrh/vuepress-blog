<template>
  <div>
    時系列順
    <ul>
      <li v-for="a in articlePages" :key="a.key">
        <a :href="a.path">{{a.title}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 記事ページ
      articlePages: [],
    };
  },
  mounted() {
    this.articlePages = this.$site.pages
      .filter(p => p.type === 'post')
      .sort((a, b) => a.path === b.path ? 0 : a.path < b.path ? -1 : 1);
  },
  computed: {},
  methods: {}
}
</script>
