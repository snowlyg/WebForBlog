<template>
  <div class="navbar">
    <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-submenu index="1">
        <template slot="title">技术文章</template>
        <el-menu-item v-for="(item) in types" :index="0">{{ item.name }}</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">文档翻译</template>
        <el-menu-item v-for="(item) in docs" :index="0">{{ item.name }}</el-menu-item>
      </el-submenu>
    </el-menu>
    <div class="text-center">
      <pan-thumb :image="avatar">snowlyg</pan-thumb>
    </div>
    <div class="other_web text-center">
      <p>努力决定一切，不向命运屈服</p>
      <a href="https://github.com/snowlyg" target="_blank"><svg-icon icon-class="github-square" class="github" /></a>
      <a href="https://learnku.com/users/16294" target="_blank"><svg-icon icon-class="laravel" class="laravel" /></a>
      <a href="//shang.qq.com/wpa/qunwpa?idkey=cc99ccf86be594e790eacc91193789746af7df4a88e84fe949e61e5c6d63537c" target="_blank"><svg-icon icon-class="qq-square" class="qq" /></a>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PanThumb from '@/components/PanThumb'
import { getPublishedDocs } from '@/api/doc'
import { getAdminInfo } from '@/api/user'

export default {
  components: { PanThumb },
  data() {
    return {
      avatar: '',
      docs: [],
      activeIndex: '1'
    }
  },
  created() {
    this.getAdmin()
    this.getDocs()
  },
  // eslint-disable-next-line vue/order-in-components
  computed: {
    ...mapGetters([
      'device',
      'types'
    ])
  },
  methods: {
    handleSelect(key, keyPath) {
      if (keyPath[0] === '1') {
        this.$store.dispatch('type/setTypeId', key).then(() => {
          this.$emit('change')
        })
      } else if (keyPath[0] === '2') {
        const newpage = this.$router.resolve({
          path: '/doc/' + key
        })
        window.open(newpage.href, '_blank')
      }
    },
    getDocs() {
      getPublishedDocs({ offset: -1, limit: -1 }).then(response => {
        this.docs = response.data.items
      })
    },
    getAdmin() {
      getAdminInfo().then(response => {
        this.avatar = response.data.avatar
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.other_web {
  p {
    color: #bbb;
    font-size: 14px;
  }
  //margin: 15px 0;
  .github{
    margin: 9px 5px;
    font-size: 24px;
    color: #242A2E;
  }
  .qq{
    margin: 8px 5px;
    font-size: 24px;
    color: #17ABE3;
  }
  .laravel{
    margin: 10px 5px;
    font-size: 21px;
    color: #FF2B1C;
  }
}

@media (max-width: 500px) {
  .navbar {
    height: 220px;
  }
}

@media (min-width: 501px) {
  .navbar {
    height: 315px;
  }
}
</style>
