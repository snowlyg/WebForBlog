<template>
  <div class="navbar text-center">
    <div class="text-center"> <span>© 2020 SNOWLYG.COM </span> | <a href="https://beian.miit.gov.cn/#/Integrated/index">{{ data }}</a></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getConfigByKey } from '@/api/config'

export default {
  components: {},
  data() {
    return {
      data: '湘ICP备20005575号-1'
    }
  },
  created() {
    this.getData()
  },
  computed: {
    ...mapGetters(['device'])
  },
  methods: {
    async getData() {
      const res = await getConfigByKey('beianhao')
      if (res.data !== '' && res.data !== null && res.data !== undefined &&
        res.data.value !== '' && res.data.value !== null && res.data.value !== undefined) {
        this.data = res.data.value
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background:  #1b1c1d;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  color: rgb(137, 137, 140);
  line-height: 50px;
  }
.navbar a{
  size: 12px;
}
</style>
