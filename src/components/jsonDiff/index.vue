<template>
  <div class="wrapper wp-json" id="pageContainer">
    <div class="panel panel-default" style="margin-bottom: 0px">
      <div class="panel-heading" v-if="showHeading">
        <h3 class="panel-title">
          <span
            class="x-error"
            v-bind:class="{ 'x-hlt': errorHighlight }"
            v-html="errorMessage"
          ></span>
        </h3>
      </div>
    </div>
    <div class="panel-body mod-json">
      <div class="col-md-6 box-wrapper-left">
        <textarea
          class="form-control mod-textarea jsonSourceLeft"
          id=""
          ref="srcLeft"
          placeholder="在这里粘贴JSON代码"
          >{{ leftData }}</textarea
        >
      </div>
      <div class="col-md-6 box-wrapper-right">
        <textarea
          class="form-control mod-textarea jsonSourceRight"
          ref="srcRight"
          placeholder="在这里粘贴JSON代码"
          >{{ rightData }}</textarea
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
// @ts-ignore
import { JsonDiff } from "./static/index.js";
interface propsParams {
  jsonSourceLeft: string | Object;
  jsonSourceRight: string | Object;
  showHeading: boolean;
  errorHandler: Function;
  diffHandler: Function;
}

const props = withDefaults(defineProps<propsParams>(), {
  showHeading: true,
  jsonSourceLeft:()=>({name:"ceshi",name2:'ce',name3:'xiaoming'}),
  jsonSourceRight:()=>({name:"ceshi"}),
});

const errorMessage = ref("");
const errorHighlight = ref(false);
const leftData = ref();
const rightData = ref();

const srcLeft = ref();
const srcRight = ref();

watch(
  () => props.jsonSourceLeft,
  (nVal) => {
    //使用四个空格缩进
    leftData.value = JSON.stringify(nVal, null, 4);
  },{
    immediate:true,
    deep:true,
  }
);
watch(
  () => props.jsonSourceRight,
  (nVal) => {
    //使用四个空格缩进
    rightData.value = JSON.stringify(nVal, null, 4);
  },{
    immediate:true,
    deep:true,
  }
);

onMounted(() => {
  // 错误处理器
  let errorHandler = (which: string, ok: any) => {
    // debugger
    if (ok) {
      errorMessage.value = "两侧JSON比对完成！";
      errorHighlight.value = false;
    } else {
     const errorMsg =    { left: "左", right: "右", "left-right": "两" } as Record<string,string>
      errorMessage.value =
      errorMsg[which] +
        "侧JSON不合法！";
      errorHighlight.value = true;
    }
  };

  // diff处理器
  let diffHandler = (diffs: any) => {
    if (!errorHighlight.value) {
      if (diffs.length) {
        errorMessage.value += "共有 " + diffs.length + " 处不一致！";
      } else {
        errorMessage.value += "左右两侧JSON内容一致！";
      }
    }
  };

  // 代码比对
  JsonDiff.init(srcLeft.value, srcRight.value, errorHandler, diffHandler);
  JsonDiff.compareJson();
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@import url("./static/css/codemirror.css");
/* @import url("./bootstrap.min.css"); */

.clearfix:before,
.clearfix:after,
.dl-horizontal dd:before,
.dl-horizontal dd:after,
.container:before,
.container:after,
.container-fluid:before,
.container-fluid:after,
.row:before,
.row:after,
.form-horizontal .form-group:before,
.form-horizontal .form-group:after,
.btn-toolbar:before,
.btn-toolbar:after,
.btn-group-vertical > .btn-group:before,
.btn-group-vertical > .btn-group:after,
.nav:before,
.nav:after,
.navbar:before,
.navbar:after,
.navbar-header:before,
.navbar-header:after,
.navbar-collapse:before,
.navbar-collapse:after,
.pager:before,
.pager:after,
.panel-body:before,
.panel-body:after,
.modal-footer:before,
.modal-footer:after {
  display: table;
  content: " ";
}
.clearfix:after,
.dl-horizontal dd:after,
.container:after,
.container-fluid:after,
.row:after,
.form-horizontal .form-group:after,
.btn-toolbar:after,
.btn-group-vertical > .btn-group:after,
.nav:after,
.navbar:after,
.navbar-header:after,
.navbar-collapse:after,
.pager:after,
.panel-body:after,
.modal-footer:after {
  clear: both;
}
.col-md-6 {
  width: 50%;
  float: left;
  position: relative;
  min-height: 1px;
}
.wp-json {
  width: auto;
}
.wp-json .CodeMirror {
  height: auto;
}
.wp-json .mod-json {
  position: absolute;
  top: 60px;
  bottom: 0;
  right: 20px;
  left: 20px;
}
.wp-json .mod-json .panel-txt {
  position: absolute;
  width: 500px;
  top: 15px;
  bottom: 0;
}
.wp-json .panel-body {
  padding: 15px 0;
  display: flex;
}
.wp-json .CodeMirror-scroll {
  min-height: 550px;
}

.box-wrapper-left {
  height: 100%;
  padding: 0 5px 0 0;
}
.box-wrapper-right {
  height: 100%;
  padding: 0 0 0 5px;
}
.jsonSourceLeft,
.jsonSourceRight,
.CodeMirror {
  height: calc(100%);
  font-size: 10px;
}
.x-error {
  float: right;
  color: #0c0;
  font-size: 14px;
}
.x-error.x-hlt {
  color: #f00;
}
</style>
