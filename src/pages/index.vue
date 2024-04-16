<template>
  <div class="main">
    <!-- -->
    <div class="main-left">
      <!-- 用户功能 -->
      <div class="main-left-content">
        <img :src="userInfrom.head || '/src/assets/image/head.png'" alt="" />
        <userMenu></userMenu>
      </div>
    </div>
    <!-- 列表 -->
    <div class="main-cart-list">
      <div class="main-cart-list-mask"></div>
      <div class="main-cart-list-content">
        <div class="list-funCode">
          <div class="list-funCode-search">
            <el-icon><Search /></el-icon>
            <input type="text" placeholder="搜索" />
          </div>
          <div class="list-funCode-addMenu">
            <el-icon><Plus /></el-icon>
          </div>
        </div>
        <div class="cartList-main">
            <messageList></messageList>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";
import userMenu from "./pageComponents/userMenu.vue";
import messageList from "./pageComponents/messageList.vue";
let { state } = useStore();

let userInfrom: any = ref({});
userInfrom.value = state.user.infrom;
console.log(userInfrom.value);

// onMounted(() => {
//     // userStore.value = user()
//     // console.log(user())
// })
</script>

<style lang="scss">
.main {
  width: 100vw;
  height: 100vh;
  display: flex;
  background: linear-gradient(
    120deg,
    #cce7f0 1.12%,
    #d9f5ff 1.12%,
    #cde8f1 1.12%,
    #f9fdff 1.18%,
    #d0ebf6 1.13%,
    #eef9ff 1.12%,
    #fcfdff 1.12%,
    #deedff 1.12%,
    #d0e9f0 1.12%,
    #ddeefe 1.12%,
    #dbeaf1 1.12%,
    #d1e8f0 1.12%,
    #eef6ff 1.12%,
    #dbf3ff 1.12%,
    #cfe7f1 1.12%,
    #cfe7f1 1.13%,
    #edfaff 1.13%,
    #ecf9ff 1.09%,
    #dcf2ff 1.08%,
    #eff6ff 1.08%,
    #def1ff 1.06%,
    #ddf0ff 1.04%,
    #ddf5ff 1.98%,
    #deeefe 1.91%,
    #dcf4ff 1.88%,
    #e1f1ff 1.88%,
    #e5f1ff 1.82%,
    #d8e9f0 1.79%,
    #dbf1ff 1.75%,
    #f1faff 1.75%,
    #e7f8ff 1.73%,
    #f8fcff 1.73%,
    #cfe8ef 1.7%,
    #f4fcff 1.64%,
    #d9f4ff 1.62%,
    #e1eeff 1.58%,
    #ddf3ff 1.52%,
    #e2f6ff 1.47%,
    #f7fcff 1.45%,
    #e5f8ff 1.42%,
    #dbf6ff 1.42%,
    #eaf9ff 1.42%,
    #e2efff 1.42%,
    #d6e9f0 1.41%,
    #daf5fe 1.4%,
    #eff8ff 1.4%,
    #e3f0ff 1.4%,
    #deeeff 1.39%,
    #daf5ff 1.39%,
    #d4e8ef 1.39%,
    #f4f9ff 1.39%,
    #dff1ff 1.39%,
    #ddf3fe 1.38%,
    #deefff 1.38%,
    #d5e9f0 1.38%,
    #f5fdff 0.38%,
    #dff2ff 0.38%,
    #dce9ef 0.37%,
    #edf5ff 0.37%,
    #f6fbff 0.37%,
    #e0f0ff 0.37%,
    #e0f2ff 0.36%,
    #f1f8ff 0.36%,
    #cde7f0 0.35%,
    #f7faff 0.33%,
    #deeff6 0.32%,
    #f5f8ff 0.32%,
    #f0fbff 0.3%,
    #f2f9ff 0.3%,
    #e4f5ff 0.29%,
    #e9f6ff 0.29%,
    #f8fdff 0.29%,
    #d4e8f1 0.29%,
    #e4f2ff 0.29%,
    #ecf4ff 0.28%,
    #e0edfe 0.28%,
    #dfedfe 0.28%,
    #f0f9ff 0.27%,
    #f0f7ff 0.27%,
    #def4ff 0.27%,
    #dfefff 0.26%,
    #ddeeff 0.25%,
    #ddeaf0 0.25%,
    #e0ebf1 0.25%,
    #f8fbff 0.25%,
    #f1f8fe 0.25%,
    #e9f8ff 0.25%,
    #edf9ff 0.24%,
    #f2fbff 0.24%,
    #e9f2ff 0.23%,
    #dcf7fe 0.23%,
    #e3f1fe 0.23%,
    #eef7ff 0.22%,
    #e1f5fe 0.22%,
    #ebf5ff 0.22%,
    #f5fafe 0.22%,
    #dfedff 0.21%,
    #d4edf4 0.21%,
    #daeaf1 0.1%,
    #daeaf1 0.21%,
    #effafe 0.21%
  );
}
.main-left {
  width: 6vw;
  height: 100%;
  background: rgb(240, 249, 255);
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  &-content {
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.7);
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 4.167vw;
      height: 4.167vw;
      border-radius: 50px;
      border: 1px solid #dadada;
      margin: 1.25vw 0;
    }
  }
}
.main-cart-list {
  width: 15.5vw;
  height: 100%;
  position: relative;
  &-mask {
    width: 100%;
    height: 100%;
    background: #fff;
    opacity: 0.5;
    position: absolute;
    left: 0;
    top: 0;
  }
  &-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 0;
    top: 0;
  }
}
.list-funCode {
  height: 4.167vw;
  display: flex;
  align-items: center;
  justify-content: center;
  &-search {
    width: 70%;
    height: 50%;
    background: rgba(0, 0, 0, 0.07);
    border-radius: 0.208vw;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0 0.625vw;
    font-size: 0.938vw;
    input {
      flex: 1;
      box-sizing: border-box;
      padding: 0 0.417vw;
      color: #00a8ff;
    }
  }
  &-addMenu {
    width: 2.083vw;
    height: 50%;
    background: rgba(0, 0, 0, 0.07);
    margin-left: 0.208vw;
    border-radius: 0.208vw;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1vw;
    cursor: pointer;
    &:hover {
      color: #00a8ff;
    }
  }
}
.cartList-main{
    flex: 1;
    overflow: hidden;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        appearance: none;
        width: 4px;
    }
    &::-webkit-scrollbar-thumb {
        width: 4px;
        height: 10px;
        background: rgba(0,0,0,.05);
        border-radius: 50px;
    }
}
</style>