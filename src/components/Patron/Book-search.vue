<template>
  <div class="book-search-page">
    <!-- <div class="cover-img"></div> -->
    <div class="Book-search-input">
      <el-input v-model="searchInput.content" size="large" placeholder="Please input" class="input-with-select">
        <template #prepend>
          <el-select v-model="searchInput.label" size="large" placeholder="Select" style="width: 115px">
            <el-option label="Author" value="author" />
            <el-option label="BookName" value="name" />
            <!-- <el-option label="Type" value="3" /> -->
          </el-select>
        </template>
        <template #append>
          <el-button :icon="Search" @click="search"/>
        </template>
      </el-input>
    </div>

    <div class="book-results">
      <el-row justify="start" gutter="25">
        <el-col
          v-for="book in results.bookLists"
          :key="book.id"
          :span="4"
          :offset="1"
        >
          <el-card style="position: relative; width: 200px; height: 290px; border-radius: 8px; border: 0px;" :body-style="{ border: '0px',padding: '0px' }" shadow="always">
            <el-image contain :src="book.img"
              class="image" />
            <div style="padding: 14px">

                <div>BookName: {{book.name}}</div>
                <div>Author: {{book.author}}</div>

              
                <div>ResNumber: {{ book.resNumber }}</div>
                <div>Location: {{ book.location }}</div>

              
              <div class="bottom">
                <el-button type="text" class="button" @click="addToLists(book)">Add to Lists</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'
import { reactive, } from 'vue';
import { getBookLists } from '@/api/modules/Patron';
import { useStore } from "vuex"
import { success, error } from '@/api';
const store = useStore();

const searchInput = reactive({
  activeUser: store.state.username,
  content: '',
  label: '',
})

const results: any = reactive({
  bookLists: Array,

})

const search = async() => {
  const { data } = await getBookLists(searchInput);
  console.log(data);
  results.bookLists = [...data.result];
  console.log(results.bookLists)
}

const addToLists = (book: any) => {
  console.log(book.ISBN, store.state.shopLists)
  const flag = store.state.shopLists.some((item: any) => {
    return item.ISBN == book.ISBN
  });
  console.log(flag)
  if(flag == false) {
    store.commit('addToLists', book)
    success('success');
  }else {
    error('You have added the same book')
  }
}


</script>

<style lang="scss" scoped>
.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
}

.book-search-page {
  position: relative;
  width: 100%;
  height: auto;
  

  .cover-img {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    background-image: url(https://s.cn.bing.net/th?id=OHR.QingMing2023_ZH-CN6951199028_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&qlt=50);
    background-size: cover;
    background-repeat: no-repeat;
  }

  .Book-search-input {
    width: 40%;
    height: auto;
    padding: 10rem 0;
    margin: 0rem auto;
    
  }

  .book-results {
    

    .el-row {
      margin-bottom: 20px;
    }

    .el-row:last-child {
      margin-bottom: 0;
    }

    .el-col {
      width: 25%;
      border-radius: 4px;
      margin-bottom: 30px;
    }
    .el-col-4 {
      max-width: 15%;
    }

    .time {
      font-size: 12px;
      color: #999;
    }

    .bottom {
      position: absolute;
      right: 10px;
      bottom: 0px;
      display: flex;
      justify-content: right;
    }

    .button {
      padding: 0;
      min-height: auto;
    }

    .image {
      width: 100%;
      height: 150px;
      display: block;
    }


  }
}</style>
