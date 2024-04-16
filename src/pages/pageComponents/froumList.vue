<template>
  <div class="froumList">
    <div class="froumList-page" v-for="(item,index) in current" :key="index">
        <div class="froumList-page-row" v-for="(row,keys) in list[`page${item}`]" :key="keys">
            <div class="row-header">
              <div class="row-header-head">
                <img :src="row.authorHead" alt="">
              </div>
              <div class="row-header-info">
                 <div class="row-header-info-nickName">{{ row.author }}</div>
                 <div class="row-header-info-ip">{{ row.ip }}</div>
              </div>
            </div>
            <div class="row-content">
              {{ row.content }}
            </div>
            <div class="row-label">
               <div class="row-label-title">标签</div>
               <div class="row-label-code" v-for="(label,type) in row.labels" :key="type">
                  {{  label.title }}
               </div>
               <div class="froum-user-fun"></div>
            </div>
        </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {toRefs} from 'vue'

const props = defineProps({
    list : {
        type : [Array,Object],
        default : {}
    },
    current : {
      type : Number,
      default : 1
    }
})
</script>

<style lang="scss" scoped>
.froumList-page-row{
  min-height: 10.417vw;
  background: rgba(255, 255, 255, 0.2);
  box-sizing: border-box;
  padding: 0 1.042vw;
  display: flex;
  flex-direction: column;
}
.row-header{
  height: 4.167vw;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  &-head {
    width: 3.125vw;
    height: 3.125vw;
    background: #f0efef;
    border-radius: 50%;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  &-info{
    text-align: left;
    margin-left: 0.833vw;
    &-nickName {
      font-size: 1.25vw;
      letter-spacing: 1px;
      font-weight: 550;
    }
    &-ip {
      font-size: 0.729vw;
      margin-top: 0.208vw;
      color: #818181;
    }
  }
}
.row-content {
  flex: 1;
  text-align: left;
  letter-spacing: 1px;
  font-size: 1.042vw;
  text-indent: 2em;
  margin-top: 0.417vw;
}
.row-label{
  height: 3.167vw;
  display: flex;
  align-items: center;
  &-title {
    font-size: 0.833vw;
    font-weight: 550;
    letter-spacing: 1;
    margin-right: 0.417vw;
  }
  &-code {
    width: 80px;
    height: 1.7vw;
    background: #fff;
    margin-right: 0.417vw;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.208vw;
    color: #00a8ff;
  }
}
</style>