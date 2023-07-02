<template>
  <div
    class="echart-box"
    style="width: 100%; height: 100%; min-height: 200px"
  >
    <div class="box-echarts"     style="width: 100%; height: 100%;" ref="ech"></div>
  </div>
</template>

<script setup lang="tsx">
import { ref, computed, onMounted } from "vue";
import * as echarts from "echarts";
import { message } from "ant-design-vue";
interface Props {
  options: ECOption;
}
type ECOption = echarts.ComposeOption<
  | echarts.BarSeriesOption
  | echarts.LineSeriesOption
  | echarts.TitleComponentOption
  | echarts.TooltipComponentOption
  | echarts.GridComponentOption
  | echarts.DatasetComponentOption
>;
const props = withDefaults(defineProps<Props>(), {
  options: () => ({
    title: {
      text: "ECharts 入门示例",
    },
    tooltip: {},
    xAxis: {
      data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
    },
    yAxis: {},
    series: [
      {
        name: "销量",
        type: "bar",
        data: [5, 20, 36, 10, 10, 20],
      },
    ],
  }),
});

const ech = ref();
const options = computed(() => props.options);

const echartInit = () => {
  const myChart = echarts.init(ech.value);
  myChart.setOption(options.value);
};

onMounted(() => {
  echartInit();
});
</script>

<style scoped lang="scss">
.echart-box {
  .box-echarts {
    width: 100%;
    height: 100%;
  }
}
</style>
