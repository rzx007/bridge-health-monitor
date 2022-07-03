<template>
  <div class="sub-gallery-viewer">
    <el-collapse v-model="activeNames" style="width: 100%" accordion>
      <el-collapse-item v-for="(item, index) in taskList" :key="index" :title="item.componentName" :name="index">
        <div class="sub-gallery-content">
          <div class="images-wrap">
            <div class="images">
              <img :src="item.img" alt="" />
            </div>
          </div>
          <div class="info">
            <h4>详情信息</h4>
            <div class="block">
              <p class="config-item">
                <span class="teil">检索部件:</span>
                <el-tag>{{ item.componentName }}</el-tag>
              </p>
              <p class="config-item">
                <span class="teil">部件编号:</span>
                <span>{{ item.componentNumber }}</span>
              </p>
              <p class="config-item">
                <span class="teil">创建日期:</span>
                <span>{{ item.createTime }}</span>
              </p>
              <p class="config-item">
                <span class="teil">备注信息:</span>
                <el-input v-model="item.remark" disabled maxlength="30" placeholder="Please input" show-word-limit type="textarea" />
              </p>
            </div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    taskList: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data() {
    return {
      activeNames: [0],
      userId: '',
      options: [],
      speciesId: '',
      speciesSex: 0,
      speciesInfo: ''
    }
  }
}
</script>
<style lang="scss">
.sub-gallery-viewer {
  .el-collapse-item__header {
    padding: 0 12px !important;
  }
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 12px;
  .sub-gallery-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    .images-wrap {
      flex: 1;
      height: 47vh;
      .images {
        width: 100%;
        margin: 0 auto;
        height: 100%;
        // background-color: #eee;
        // display: flex;
        // align-items: center;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    .info {
      width: 340px;
      margin-left: 28px;
      .block {
        padding: 20px 0;
        .config-item {
          line-height: 30px;
          font-size: 13px;
          margin-bottom: 12px;
          .teil {
            display: inline-block;
            width: 120px;
            letter-spacing: 2px;
            text-align: start;
          }
          .sub-teil {
            font-size: 17px;
            font-weight: 600;
          }
        }
      }
      h4 {
        letter-spacing: 3px;
        text-indent: 4px;
        position: relative;
        margin-bottom: 4px;
        font-size: 20px;
        &::after {
          content: '';
          position: absolute;
          left: -6px;
          top: 0;
          height: 100%;
          width: 4px;
          @include tool-bar-color();
        }
      }
      .btn {
        margin-top: 30px;
      }
    }
  }
}
</style>
