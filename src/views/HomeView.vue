<template>
  <div class="home">
    <div style="width: 600px; height: 600px">
      <MyEcahrts v-bind="$attrs" :options="options1"></MyEcahrts>
    </div>
    <div style="width: 600px; height: 600px">
      <MyEcahrts :options="options2"></MyEcahrts>
    </div>
    <div style="width: 600px; height: 600px">
      <MyEcahrts :options="options3"></MyEcahrts>
    </div>
    <div style="width: 600px; height: 600px">
      <MyEcahrts :options="options4"></MyEcahrts>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import MyEcahrts from "@/components/Common/Echarts/index.vue";
import { getLineEchartsOptions } from "./echartsTestOptions/index";
import { echartDatas } from "./echartsTestOptions/testData";

export default defineComponent({
  name: "HomeView",
  components: { MyEcahrts },
  setup() {
    const options1 = ref();
    const options2 = ref();
    const options3 = ref();
    const options4 = ref();
    const setOptions1 = () => {

      options1.value = getLineEchartsOptions(echartDatas.data);
    };
    setOptions1();




    const setOptions2 = () => {
      options2.value = {
        legend: {},
        tooltip: {},
        dataset: {
          source: [
            ["product", "2015", "2016", "2017"],
            ["Matcha Latte", 43.3, 85.8, 93.7],
            ["Milk Tea", 83.1, 73.4, 55.1],
            ["Cheese Cocoa", 86.4, 65.2, 82.5],
            ["Walnut Brownie", 72.4, 53.9, 39.1],
          ],
        },
        xAxis: { type: "category" },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }],
      };
    };

    setOptions2();
    const setOptions3 = () => {
      options3.value = {
        title: {
          text: "Referer of a Website",
          subtext: "Fake Data",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
              { value: 484, name: "Union Ads" },
              { value: 300, name: "Video Ads" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
    };
    setOptions3();
    const setOptions4 = () => {
      options4.value = {
        title: {
          text: "Basic Radar Chart",
        },
        legend: {
          data: ["Allocated Budget", "Actual Spending"],
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: "Sales", max: 6500 },
            { name: "Administration", max: 16000 },
            { name: "Information Technology", max: 30000 },
            { name: "Customer Support", max: 38000 },
            { name: "Development", max: 52000 },
            { name: "Marketing", max: 25000 },
          ],
        },
        series: [
          {
            name: "Budget vs spending",
            type: "radar",
            data: [
              {
                value: [4200, 3000, 20000, 35000, 50000, 18000],
                name: "Allocated Budget",
              },
              {
                value: [5000, 14000, 28000, 26000, 42000, 21000],
                name: "Actual Spending",
              },
            ],
          },
        ],
      };
    };
    setOptions4();
    return {
      options1,
      options2,
      options3,
      options4,
    };
  },
});
</script>

<style scoped lang="scss">
.home {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
