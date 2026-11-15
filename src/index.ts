import DcpChart from '@/components/Chart.vue';

export type {
  ChartModes as DcpChartModes,
  ChartTypes as DcpChartTypes,
  ChartSeries as DcpChartSeries,
  AxisConfig as DcpAxisConfig,
  ChartEventData as DcpChartEventData,
  ChartEventHandler as DcpChartEventHandler,
  ChartEventTypes as DcpChartEventTypes,
  ChartViewData as DcpChartViewData,
  ChartActionData as DcpChartActionData,
  ChartSelectionData as DcpChartSelectionData,
  ChartAnnotation as DcpChartAnnotation,
  ChartAnnotationStyle as DcpChartAnnotationStyle,
  ChartShape as DcpChartShape,
  ChartShapeTypes as DcpChartShapeTypes,
} from '@open-dcp/charts';

export {
  AxisPosition,
  ChartEventType as DcpChartEventType,
  ChartShapeType as DcpChartShapeType,
} from '@open-dcp/charts';

export {
  default as Plotly,
  default as plotly,
} from '@open-dcp/charts/plotly';

const dcpComponents = {
  DcpChart
};

export default {
  install(app: any) {
    for (const [name, component] of Object.entries(dcpComponents)) {
      app.component(name, component);
    }
  },
};

// Export components individually as well
export {
  DcpChart
};
