<template>
    <div class="userMenu">
        <div class="userMenu-icon" @click="handleUserMenu(1)" :style="{
            background: active==1?'rgba(0,0,0,.1)':'',
            color: active==1?'#00a8ff':'#000'
        }">
            <el-icon><ChatLineRound /></el-icon>
        </div>
        <div class="userMenu-icon" @click="handleUserMenu(2)" :style="{background: active==2?'rgba(0,0,0,.1)':'',color: active==2?'#00a8ff':'#000'}">
            <el-icon><User /></el-icon>
        </div>
        <div class="userMenu-icon" @click="handleUserMenu(3)" :style="{background: active==3?'rgba(0,0,0,.1)':'',color: active==3?'#00a8ff':'#000'}">
            <el-icon><HelpFilled /></el-icon>
        </div>
        <div class="userMenu-icon" @click="handleUserMenu(4)" :style="{background: active==4?'rgba(0,0,0,.1)':'',color: active==4?'#00a8ff':'#000'}">
            <el-icon><StarFilled /></el-icon>
        </div>
    </div>
    <div class="puliceMenu">
        <div class="puliceMenu-icon" @click="handleUserMenu(5)" :style="{background: active==5?'rgba(0,0,0,.1)':'',color: active==5?'#00a8ff':'#000'}">
            <el-icon><Setting /></el-icon>
        </div>
        <div class="puliceMenu-icon" @click="handleUserMenu(6)" :style="{background: active==6?'rgba(0,0,0,.1)':'',color: active==6?'#00a8ff':'#000'}">
            <el-icon><Operation /></el-icon>
        </div>
    </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
let active = ref(1)

// 切换菜单
const handleUserMenu:any = (i:any) => {
    active.value = i
}
</script>

<style lang="scss" scoped>
.userMenu{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    &-icon {
        width: 3.125vw;
        height: 3.125vw;
        font-size: 1.25vw;
        margin: 0.208vw auto;
        color: #000;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 0.417vw;
        cursor: pointer;
        &:hover {
            background: rgba(0,0,0,.1);
            color: #00a8ff;
        }
    }
}
.puliceMenu{
    margin-top: auto;
    margin-bottom: 0.625vw;
    &-icon {
        width: 3.125vw;
        height: 3.125vw;
        font-size: 1.25vw;
        margin: 0.208vw auto;
        color: #000;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border-radius: 0.417vw;
        &:hover {
            background: rgba(0,0,0,.1);
            color: #00a8ff;
        }
    }
}
</style>