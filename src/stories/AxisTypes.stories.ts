import type { Meta, StoryFn } from "@storybook/vue3";
import DcpChart from "@/components/Chart.vue";
import { AxisPosition } from '@open-dcp/charts';
import type { AxisConfig, ChartSeries } from '@open-dcp/charts';
import { computed, ref } from "vue";

const meta: Meta<typeof DcpChart> = {
    title: "Axis Types",
    component: DcpChart
};
export default meta;

const layout = { width: 600, height: 400 };

const data: ChartSeries[] = [
    {
        x: [1, 2, 3, 4, 5, 6],
        y: [1, 10, 100, 1000, 10000, 100000],
        type: "scatter",
        mode: "lines+markers",
        name: "Exponential growth"
    }
];

const buildAxes = (type: 'linear' | 'log', range?: [number, number]): AxisConfig[] => [
    { id: 'x', title: 'Step', position: AxisPosition.Bottom },
    { id: 'y', title: `Value (${type})`, position: AxisPosition.Left, type, range },
];

const Template: StoryFn<typeof DcpChart> = (args) => ({
    components: { DcpChart },
    setup() {
        return { args };
    },
    template: '<DcpChart v-bind="args" />',
});

export const Linear = Template.bind({});
Linear.args = {
    layout,
    data,
    axes: buildAxes('linear')
};

export const Logarithmic = Template.bind({});
Logarithmic.args = {
    layout,
    data,
    axes: buildAxes('log')
};

export const LogarithmicWithRange = Template.bind({});
LogarithmicWithRange.args = {
    layout,
    data,
    axes: buildAxes('log', [10, 10000])
};

export const SwitchScale: StoryFn<typeof DcpChart> = () => ({
    components: { DcpChart },
    setup() {
        const type = ref<'linear' | 'log'>('log');
        const axes = computed(() => buildAxes(type.value));
        const toggle = () => {
            type.value = type.value === 'log' ? 'linear' : 'log';
        };

        return { axes, data, layout, toggle, type };
    },
    template: `
        <div>
            <button type="button" @click="toggle" style="margin-bottom: 12px; padding: 4px 12px;">
                Switch to {{ type === 'log' ? 'linear' : 'log' }}
            </button>
            <DcpChart :data="data" :layout="layout" :axes="axes" />
        </div>
    `,
});
