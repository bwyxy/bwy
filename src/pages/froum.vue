<template>
  <div class="froum">
    <div class="froum-header">
      <div class="initContent froum-header-content">
        <div class="userInfrom">
          <img src="../assets/image/head.png" alt="" />
          <span>无名氏</span>
        </div>
        <div class="froum-fun">
          <div
            class="froum-fun-code"
            :style="{
              background: active == 1 ? 'rgba(0,0,0,.1)' : '',
              color: active == 1 ? '#00a8ff' : '',
            }"
            @click="handleMenu(1)"
            data-title="首页"
          >
            <el-icon><HomeFilled /></el-icon>
          </div>
          <div
            class="froum-fun-code"
            :style="{
              background: active == 2 ? 'rgba(0,0,0,.1)' : '',
              color: active == 2 ? '#00a8ff' : '',
            }"
            @click="handleMenu(2)"
            data-title="发布"
          >
            <el-icon><Promotion /></el-icon>
          </div>
          <div
            class="froum-fun-code"
            :style="{
              background: active == 3 ? 'rgba(0,0,0,.1)' : '',
              color: active == 3 ? '#00a8ff' : '',
            }"
            @click="handleMenu(3)"
            data-title="收藏"
          >
            <el-icon><StarFilled /></el-icon>
          </div>
          <div
            class="froum-fun-code"
            :style="{
              background: active == 4 ? 'rgba(0,0,0,.1)' : '',
              color: active == 4 ? '#00a8ff' : '',
            }"
            @click="handleMenu(4)"
            data-title="通知"
          >
            <el-icon><Bell /></el-icon>
          </div>
        </div>
      </div>
    </div>
    <div class="froum-nav" v-show="active==1">
      <div class="initContent froum-nav-row">
        <div class="froum-nav-row-code" @click="handleCheckoutLabel(item.id)" :style="{color: labelActive==item.id?'#00a8ff':'#333'}" v-for="(item, index) in labels" :key="index">
          <div class="froum-nav-row-code-title">{{ item.title }}</div>
          <div class="froum-nav-row-code-mask" v-show="labelActive==item.id"></div>
        </div>
      </div>
    </div>
    <div class="froum-main">
      <div class="initContent">
        <!-- 列表 -->
        <div v-if="active == 1">
          <froumList :list="froum.data" :current="froum.current"></froumList>
        </div>
        <!-- 发布论坛 -->
        <div v-if="active == 2">
          <releaseFroum :labelList="labelList"></releaseFroum>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getLabel,getFroumList } from "../api/froum";
import releaseFroum from "./pageComponents/releaseFroum.vue";
import froumList from "./pageComponents/froumList.vue";
const active: any = ref(1);
let labelList = ref([]);
let labels = ref([])
let labelActive = ref(0)
const froum = ref({
  current : 1,
  limit : 20,
  data : {}
})

// 获取标签
const getLabels: any = () => {
  getLabel().then((res: any) => {
    if (res.code == 200) {
      labelList.value = res.data;
      labels.value = JSON.parse(JSON.stringify(res.data))
      labels.value.unshift({
        id : 0,
        title : '全部'
      })
    }
  });
};
// 选择目录
const handleMenu: any = (id: Number) => {
  active.value = id;
};
// 选择标签
const handleCheckoutLabel:any = (id:any) => {
  labelActive.value = id
}
// 获取论坛列表
const getFroumLists:any = () => {
  let {current,limit} = froum.value
  getFroumList({
    currentPage : current,
    limit,
    labelId : labelActive.value
  }).then((res:any) => {
    if(res.code == 200) {
      froum.value.data[`page${current}`] = res.data.list
      console.log(froum.value.data)
    }
  })
}

onMounted(() => {
  getLabels();
  getFroumLists()
});
</script>

<style lang="scss" scoped>
.froum {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: -webkit-linear-gradient(90deg, #ecfef6, #eaebfb);
  background: linear-gradient(90deg, #ecfef6, #eaebfb);
}
.initContent {
  width: 80%;
  margin: 0 auto;
}
.froum-header {
  width: 100%;
  height: 3.125vw;
  background: rgb(240, 249, 255);
  box-shadow: rgba(99, 99, 99, 0.2) 0px 1px 1px 0px;
  &-content {
    height: 100%;
    display: flex;
    align-items: center;
    .userInfrom {
      display: flex;
      align-items: center;
      span {
        font-size: 0.833vw;
        letter-spacing: 1px;
        font-weight: 550;
        margin-left: 0.417vw;
      }
    }
    img {
      width: 2.604vw;
      height: 2.604vw;
      border-radius: 50%;
      border: 1px solid #dadada;
    }
  }
}
.froum-fun {
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: right;
  &-code {
    width: 2.604vw;
    height: 2.604vw;
    font-size: 1.25vw;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.417vw;
    border-radius: 0.26vw;
    cursor: pointer;
    position: relative;
    &:last-child {
      margin-right: 0;
    }
    &:hover {
      background: rgba(0, 0, 0, 0.1);
      color: #00a8ff;
    }
  }
}
[data-title] {
  &:hover {
    position: relative;
    &::before {
      content: "";
      position: absolute;
      bottom: -0.417vw;
      width: 0;
      height: 0;
      border: 0.25vw solid;
      border-color: transparent transparent #fff transparent;
    }
    &:after {
      content: attr(data-title);
      position: absolute;
      bottom: -2vw;
      color: #666;
      font-size: 10px;
      background-color: #fff;
      z-index: 20;
      font-style: normal;
      white-space: nowrap;
      width: 3.125vw;
      height: 1.563vw;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 0.208vw;
    }
  }
}
.froum-nav {
  width: 100%;
  height: 2.604vw;
  background: rgba(255, 255, 255, 0.3);
  border-bottom: 1px solid #dadada;
  &-row {
    height: 100%;
    display: flex;
    align-items: center;
    &-code {
        flex: 1;
        height: 100%;
        padding: 0 1.042vw;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        cursor: pointer;
        &-title {
          z-index: 1;
        }
        &-mask {
          width: 80%;
          height: 70%;
          background: #fff;
          border-radius: 0.208vw;
          opacity: .8;
          position: absolute;
          left: 10%;
          top: 15%;
        }
    }
  }
}
.froum-main {
  flex: 1;
  width: 100%;
  overflow: hidden;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    appearance: none;
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    width: 5px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 50px;
  }
}
</style>
