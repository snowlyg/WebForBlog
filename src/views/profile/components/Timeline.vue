<template>
  <div class="block">
    <el-timeline>
      <el-timeline-item v-for="(item,index) of timeline" :key="index" :timestamp="item.timestamp" placement="top">
        <el-card>
          <h4>{{ item.title }}</h4>
          <p>{{ item.content }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeline: [
        {
          timestamp: '2017/3/25',
          title: '入坑编程行业',
          content: ' 2017/3/25 09:00 入职广东东华供应链科技有限公司'
        },
        {
          timestamp: '2018/12/30',
          title: '入坑 Go 语言',
          content: ' 2018/12/30 20:46 第一个Go开源项目 IrisAdminApi 更新到 GitHub'
        },
        {
          timestamp: '2020/03/30',
          title: '离开第一家公司，开始开始颠沛流离',
          content: ' 2020/03/30 20:46 疫情环境下，离开第一家公司。辗转 芝麻地 、广东德奥医疗 、 中软华腾三家公司'
        }
      ]
    }
  }
}
</script>
