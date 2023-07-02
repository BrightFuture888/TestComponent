export const transfromLineData = (chartData: { rows: []; columns: [] }) => {
  const seriesObj = {
    name: "",
    type: "line",
    stack: "",
    data: [],
  };
  //此处写数据转化逻辑，最终转化成 legend data series
  const row = chartData.rows;
  const column = chartData.columns;
  const datas = {} as Record<string, any[]>;
  const date = [] as any;
  const legend = [] as any;
  const series = [] as any;

  // 这里的一步是为了吧 rows 中的数据转化成单独的一列
  for (const rowData of row) {
    for (const [k, v] of Object.entries(rowData)) {
      if (!datas[k]) {
        datas[k] = [];
      }
      datas[k].push(v);
    }
  }

  for (const day of column) {
    const { en, cn } = day;

    if (en !== "date") {
      const s = JSON.parse(JSON.stringify(seriesObj));
      s.name = cn;
      s.data = datas[en] as any;
      series.push(s);
      legend.push(cn);
    }
  }

  return [legend, datas.date, series];
};
