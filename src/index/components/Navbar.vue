<template>
  <div class="navbar">
    <div class="text-center">
      <pan-thumb image="">snowlyg</pan-thumb>
    </div>
    <div class="other_web text-center">
      <p>努力决定一切，不向命运屈服</p>
      <a href="https://github.com/snowlyg" target="_blank"><svg-icon icon-class="github-square" class="github" /></a>
      <a href="https://learnku.com/blog/about_laravel" target="_blank"><svg-icon icon-class="laravel" class="laravel" /></a>
      <a href="//shang.qq.com/wpa/qunwpa?idkey=cc99ccf86be594e790eacc91193789746af7df4a88e84fe949e61e5c6d63537c" target="_blank"><svg-icon icon-class="qq-square" class="qq" /></a>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PanThumb from '@/components/PanThumb'

export default {
  components: { PanThumb },
  computed: {
    ...mapGetters(['device'])
  },
  methods: {}
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
