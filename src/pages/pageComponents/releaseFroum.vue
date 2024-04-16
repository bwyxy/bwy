<template>
  <div class="release-top">
    <div class="release-top-code">
      <p>标题</p>
      <el-input v-model="froumFrom.title" placeholder="标题" />
    </div>
    <div class="release-top-code">
      <p>标签</p>
      <div class="label-code" :style="{color : labelIds.indexOf(item.id)!==-1?'#00a8ff':'#333'}" @click="handleSelectLabel(item.id)" v-for="(item,index) in labels" :key="index">{{ item.title }}</div>
    </div>
  </div>
  <div class="release-text">
    <div class="release-text-fun">
      <div
        class="release-text-fun-code"
        v-for="(item, index) in emoji"
        :key="index"
      >
        {{ item }}
      </div>
    </div>
    <textarea
      id="textarea"
      v-model="froumFrom.content"
      placeholder="注意言语哦！"
    ></textarea>
    <div class="release-text-submit" @click="submitFroums">发表</div>
  </div>
  <div class="release-images">
    <div class="release-images-updata">
        <el-icon style="font-size: 1.875vw;"><Plus /></el-icon>
        <span>上传图片</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref , toRefs } from "vue";
import {submitFroum} from '../../api/froum'
import { emojiList, emojiSelect } from "../../utils/utils";
import { ElMessage } from 'element-plus'

let froumFrom:any = ref({
  title: "",
  type: [],
  content: "",
  images: [],
  videos: [],
});

const emojis = ref(emojiList);
const emoji = ref(emojiSelect);

let labels:any = ref([])
let labelIds:any = ref([])
const props = defineProps({
    labelList : {
        type : Array,
        default : []
    }
})

let {labelList} = toRefs(props)
labels.value = labelList.value
console.log(labels.value)

// 选择标签
const handleSelectLabel:any = (id:Number) => {
    let index = labelIds.value.indexOf(id)
    if(index !== -1) {
        labelIds.value.splice(index , 1)
    }else {
        labelIds.value.push(id)
    }
}
// 发表圈子
const submitFroums : any = () => {
    let {title,content,images} = froumFrom.value
    if(!title) return ElMessage.error('标题');
    if(!content) return ElMessage.error('内容');
    submitFroum({
        title,
        content,
        images,
        labels : labelIds.value
    }).then((res:any) => {
        if(res.code == 200) {
            ElMessage.success('发布成功')
            froumFrom.value.title = ''
            froumFrom.value.content = ''
            froumFrom.value.images = []
            labelIds.value = []
        }
    })
}

</script>

<style lang="scss" scoped>
.release-top {
  width: 100%;
  min-height: 0.042vw;
  background: rgba(255, 255, 255, 0.4);
  display: flex;
  flex-direction: column;
  align-items: self-start;
  box-sizing: border-box;
  padding: 1.25vw;
  font-size: 0.833vw;
  font-weight: 550;
  letter-spacing: 1px;
  position: relative;
  &::after {
    content: "";
    width: calc(100% - (1.25vw + 1.25vw));
    border-bottom: 1px solid #dadada;
    position: absolute;
    bottom: 0;
  }
  &-code {
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 1.25vw;
    p {
      width: 3.125vw;
    }
    &:nth-child(1) {
      margin-top: 0;
    }
  }
}
.label-code {
  height: 2.083vw;
  display: flex;
  align-items: center;
  background: #fff;
  padding: 0 0.833vw;
  border-radius: 0.208vw;
  color: #00a8ff;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0 0.104vw -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  cursor: pointer;
  margin-right: 0.417vw;
}
.release-text {
  width: 100%;
  min-height: 0.042vw;
  background: rgba(255, 255, 255, 0.4);
  display: flex;
  flex-direction: column;
  align-items: self-start;
  box-sizing: border-box;
  padding: 1.25vw;
  font-size: 0.833vw;
  font-weight: 550;
  letter-spacing: 1px;
  position: relative;
  &::after {
    content: "";
    width: calc(100% - (1.25vw + 1.25vw));
    border-bottom: 1px solid #dadada;
    position: absolute;
    bottom: 0;
  }
  &-fun {
    width: 100%;
    height: 2.604vw;
    background: #fff;
    box-sizing: border-box;
    border: 1px solid #dadada;
    border-bottom: none;
    display: flex;
    align-items: center;
    &-code {
      width: 3.125vw;
      height: 100%;
      font-size: 1.042vw;
      border-right: 1px solid #dadada;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      &:hover {
        background: rgba(0, 0, 0, 0.01);
      }
    }
  }
  &-submit {
    width: 5.208vw;
    height: 2.083vw;
    background: #00a8ff;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.208vw;
    margin-left: auto;
    margin-top: 0.833vw;
    cursor: pointer;
  }
}
#textarea {
  width: 100%;
  height: 12.5vw;
  background: #fff;
  border: none;
  box-sizing: border-box;
  padding: 0.833vw;
  font-size: #333;
  font-weight: 500;
  font-size: 1.042vw;
  letter-spacing: 2px;
  border: 1px solid #dadada;
  &:focus {
    outline: none;
  }
}
.release-images{
    width: 100%;
    min-height: 0.042vw;
    background: rgba(255, 255, 255, 0.4);
    display: flex;
    align-items: self-start;
    box-sizing: border-box;
    padding: 1.25vw;
    font-size: 0.833vw;
    font-weight: 550;
    letter-spacing: 1px;
    margin-bottom: 1.25vw;
    flex-wrap: wrap;
    &-updata{
        width: 6.25vw;
        height: 8.333vw;
        background: #fff;
        border: 1px solid #dadada;
        border-radius: 0.208vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #333;
        cursor: pointer;
        span {
            font-size: 0.833vw;
            margin-top: 0.417vw;
        }
        &:hover {
            border-color: #00a8ff;
            color: #00a8ff
        }
    }
}
</style>
