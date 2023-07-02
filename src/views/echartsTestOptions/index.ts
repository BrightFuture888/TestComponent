import { transfromLineData } from "./echartsDataTransfrom";

export const getLineEchartsOptions = (echartData: any) => {
  const [legend, data, series] = transfromLineData(echartData);
  return {
    title: {
      text: "测试1",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: legend,
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data,
    },
    yAxis: {
      type: "value",
    },
    series,
  };
};
