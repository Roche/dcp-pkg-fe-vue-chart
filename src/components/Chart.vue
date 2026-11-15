<template>
    <component :is="loadingPlaceholderComponent" v-if="!showChart" />
    <div v-if="showChart || hasMounted" v-show="showChart" ref="chartContainer"></div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch, toRaw, computed, nextTick } from 'vue';
import {
    ChartService,
    ChartConfig,
    PlotlyAdapter,
    ChartLayout,
    ChartSeries,
    AxisConfig,
    ChartEventHandler,
    ChartEventTypes,
    InteractionModes,
    SelectModes,
    InteractionMode,
    SelectMode,
    ChartShape,
    ChartAnnotation
} from '@open-dcp/charts';
import { ChartTypes, ChartModes } from '@/enums/Chart';
import ChartPlaceholder from '@/components/ChartPlaceholder.vue';
import { debounce } from 'lodash-es';

// Utility function to generate a random unique ID
function generateRandomId(): string {
    return `chart-${Math.random().toString(36).slice(2, 11)}`;
}

const showChart = computed(() => {
    const width = props.layout?.width;
    const height = props.layout?.height;
    return Number.isFinite(width) && width > 0 && Number.isFinite(height) && height > 0;
});

type ChartOptions = {
    modeBarButtonsToRemove?: string[];
    modeBarButtonsToAdd?: any[];
    scrollZoom?: boolean;
    [key: string]: any;
};

const props = withDefaults(defineProps<{
    data: ChartSeries[];
    layout: ChartLayout;
    shapes?: ChartShape[];
    annotations?: ChartAnnotation[];
    axes?: AxisConfig[];
    chartId?: string;
    loadingPlaceholder?: any;
    showLegend?: boolean;
    showModeBar?: boolean | string;
    modeBarOptions?: ChartOptions;
    options?: ChartOptions;
    interactionMode?: InteractionModes;
    selectMode?: SelectModes;
    events?: Partial<Record<ChartEventTypes, ChartEventHandler>>;
}>(), {
    modeBarOptions: () => ({}),
    options: () => ({})
});

// Use provided placeholder or fallback to default
const loadingPlaceholderComponent = computed(() => props.loadingPlaceholder || ChartPlaceholder);

// Use the provided chartId or generate a random one
const chartId = props.chartId || generateRandomId();

const chartContainer = ref<HTMLElement | null>(null);
const adapter = new PlotlyAdapter();
const chartService = new ChartService(chartId, adapter);
const hasMounted = ref(false);
let disposed = false;

function normalizeOptions(options?: ChartOptions): Record<string, any> {
    return options ? { ...options } : {};
}

function buildChartOptions(
    showModeBar: boolean | string | undefined,
    modeBarOptions?: ChartOptions,
    options?: ChartOptions
) {
    return {
        displayModeBar: showModeBar ?? 'hover',
        ...normalizeOptions(modeBarOptions),
        ...normalizeOptions(options)
    };
}

function buildLayoutStyle(
    layout: ChartLayout,
    showLegend: boolean | undefined
) {
    if (showLegend === undefined) {
        return layout?.style;
    }

    return {
        ...layout?.style,
        showLegend,
    };
}

// Normalize series data by applying default type and mode
function normalizeSeries(series: ChartSeries[]): ChartSeries[] {
    return series.map(s => ({
        ...s,
        type: s.type || ChartTypes.Scatter,
        mode: s.mode || ChartModes.LinesAndMarkers,
    }));
}

// Reactive chart configuration
const chartConfig = ref<ChartConfig>({
    data: props.data ? normalizeSeries(props.data) : [],
    shapes: props.shapes || [],
    annotations: props.annotations || [],
    layout: {
        width: props.layout?.width,
        height: props.layout?.height,
        margin: props.layout?.margin,
        style: buildLayoutStyle(props.layout, props.showLegend),
        interactionMode: props.interactionMode ?? InteractionMode.None,
        selectMode: props.selectMode ?? SelectMode.Box,
    },
    axes: props.axes || [],
    options: buildChartOptions(props.showModeBar, props.modeBarOptions, props.options),
    events: props.events ?? {}
});

const updateConfig = () => {
    if (disposed || !hasMounted.value || !showChart.value) {
        return;
    }

    chartService.setConfig(toRaw(chartConfig.value));
};

const syncLayout = () => {
    if (!chartConfig.value.layout) {
        return;
    }

    chartConfig.value.layout.height = props.layout.height;
    chartConfig.value.layout.width = props.layout.width;
    chartConfig.value.layout.margin = props.layout.margin;
    chartConfig.value.layout.style = buildLayoutStyle(props.layout, props.showLegend);
    chartConfig.value.layout.selectMode = props.selectMode ?? props.layout.selectMode ?? SelectMode.Box;
};

const updateLayout = debounce(() => {
    if (disposed) {
        return;
    }

    syncLayout();
    updateConfig();
}, 300);

const mountChart = () => {
    if (disposed || !showChart.value || !chartContainer.value) {
        return;
    }

    // Read current dimensions before the first render rather than waiting for the debounce.
    updateLayout.cancel();
    syncLayout();
    chartService.setConfig(toRaw(chartConfig.value));
    if (!hasMounted.value) {
        chartService.mount(chartContainer.value);
        hasMounted.value = true;
    }
};

const deselect = () => {
    if (disposed || !hasMounted.value || !showChart.value || !chartContainer.value) {
        return;
    }

    chartService.deselect();
};

defineExpose({
    deselect
});

onMounted(() => {
    if (showChart.value) {
        mountChart();
    }
});

onBeforeUnmount(() => {
    disposed = true;
    updateLayout.cancel();
    chartService.destroy();
});

watch(showChart, async (val) => {
    if (val) {
        await nextTick();
        mountChart();
    }
});

watch(() => props.data, (newData) => {
    if (!newData) {
        return;
    }

    chartConfig.value.data = normalizeSeries(newData);
    updateConfig();
}, { deep: true });

watch(() => props.axes, (newAxes) => {
    chartConfig.value.axes = newAxes;
    updateConfig();
}, { deep: true });

watch(() => props.annotations, (newAnnotations) => {
    chartConfig.value.annotations = newAnnotations || [];
    updateConfig();
}, { deep: true });

watch(() => props.shapes, (newShapes) => {
    chartConfig.value.shapes = newShapes || [];
    updateConfig();
}, { deep: true });

watch(() => props.layout, updateLayout, { deep: true });

watch(() => props.showLegend, (newVal) => {
    if (!chartConfig.value.layout) {
        return;
    }

    chartConfig.value.layout.style = buildLayoutStyle(props.layout, newVal);
    updateConfig();
});

watch(() => props.showModeBar, (newVal) => {
    chartConfig.value.options = buildChartOptions(newVal, props.modeBarOptions, props.options);
    updateConfig();
});

watch(() => props.modeBarOptions, (newOptions) => {
    chartConfig.value.options = buildChartOptions(props.showModeBar, newOptions, props.options);
    updateConfig();
}, { deep: true });

watch(() => props.options, (newOptions) => {
    chartConfig.value.options = buildChartOptions(props.showModeBar, props.modeBarOptions, newOptions);
    updateConfig();
}, { deep: true });

watch(() => props.interactionMode, (newMode) => {
    if (newMode !== undefined && chartConfig.value.layout) {
        chartConfig.value.layout.interactionMode = newMode;
        if (!disposed && hasMounted.value && showChart.value) {
            chartService.setInteractionMode(newMode);
        }
    }
});

watch(() => props.selectMode, (newMode) => {
    if (newMode !== undefined && chartConfig.value.layout) {
        chartConfig.value.layout.selectMode = newMode;
        if (!disposed && hasMounted.value && showChart.value) {
            chartService.setSelectMode(newMode);
        }
    }
});

watch(() => props.events, (newEvents) => {
    chartConfig.value.events = newEvents || {};
    updateConfig();
}, { deep: true });
</script>