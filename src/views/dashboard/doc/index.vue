<template>
  <div class="components-container">
    <div class="board-column">
      <div class="board-column-header">
        {{ doc.name }}
      </div>
      <div v-for="element in doc.chapters" :key="element.id" class="board-item">
        <router-link target="_blank" :to="'/chapter/'+element.id" class="link-type">
          {{ element.name }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getPublishedDoc } from '@/api/doc'

export default {
  metaInfo() {
    return {
      title: `${this.doc.name} - 翻译文档`,
      bodyAttrs: {
        class: 'child-component'
      }
    }
  },
  name: 'DashboardEditor',
  components: {},
  data() {
    return {
      group: 'mission',
      doc: {
        id: 0,
        name: '',
        chapters: []
      }
    }
  },
  created() {
    const id = this.$route.params && this.$route.params.id
    this.getDetail(id)
  },
  methods: {
    getDetail(id) {
      this.listLoading = true
      getPublishedDoc(id).then(response => {
        this.doc = response.data
      })
    }
  },
  // eslint-disable-next-line vue/order-in-components
  computed: {
    ...mapGetters([])
  }
}
</script>

<style lang="scss" scoped>
@media (min-width: 501px) {

  .components-container {
    padding: 0 100px;
    margin: 56px 0 0 0;
    position: relative;

    .board-column {
      min-width: 300px;
      min-height: 100px;
      height: auto;
      overflow: hidden;
      background: #f0f0f0;
      border-radius: 3px;

      .board-column-header {
        height: 50px;
        line-height: 50px;
        overflow: hidden;
        padding: 0 20px;
        text-align: center;
        background: #4A9FF9;
        color: #fff;
        border-radius: 3px 3px 0 0;
      }

      .board-item {
        cursor: pointer;
        //width: 100%;
        height: 64px;
        margin: 10px;
        background-color: #fff;
        text-align: left;
        line-height: 54px;
        padding: 5px 10px;
        box-sizing: border-box;
        box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.2);
      }

      .board-column-content {
        height: auto;
        overflow: hidden;
        border: 10px solid transparent;
        min-height: 60px;
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        align-items: center;

      }
    }
  }
}

@media (max-width: 500px) {
  .board-column {
    min-width: 300px;
    min-height: 100px;
    height: auto;
    overflow: hidden;
    background: #f0f0f0;
    border-radius: 3px;

    .board-item {
      cursor: pointer;
      //width: 100%;
      height: 64px;
      margin: 10px;
      background-color: #fff;
      text-align: left;
      line-height: 54px;
      padding: 5px 10px;
      box-sizing: border-box;
    }

    .board-column-header {
      height: 50px;
      line-height: 50px;
      overflow: hidden;
      padding: 0 20px;
      text-align: center;
      background: #4A9FF9;
      color: #fff;
      border-radius: 3px 3px 0 0;
    }

    .board-column-content {
      height: auto;
      overflow: hidden;
      border: 10px solid transparent;
      min-height: 60px;
      display: flex;
      justify-content: flex-start;
      flex-direction: column;
      align-items: center;
    }
  }
  .components-container {
    padding: 20px;
    margin: 56px 0 0 0;
    position: relative;
  }
}
</style>
