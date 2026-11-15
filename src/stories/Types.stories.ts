import type { Meta, StoryFn } from "@storybook/vue3";
import DcpChart from "@/components/Chart.vue";

const meta: Meta<typeof DcpChart> = {
    title: "Types",
    component: DcpChart
};
export default meta;

const Template: StoryFn<typeof DcpChart> = (args) => ({
    components: { DcpChart },
    setup() {
        return { args };
    },
    template: '<DcpChart v-bind="args" />',
});

export const ScatterChart = Template.bind({});
ScatterChart.args = {
    layout: {
        width: 500,
        height: 500
    },
    data: [
        {
            x: [1, 2, 3],
            y: [4, 5, 6],
            type: "scatter"
        }
    ]
};

export const BarChart = Template.bind({});
BarChart.args = {
    layout: {
        width: 500,
        height: 500
    },
    data: [
        {
            x: [1, 2, 3],
            y: [7, 8, 9],
            type: "bar",
            style: {
                orientation: "horizontal"
            }
        }
    ]
};

export const Histogram = Template.bind({});
Histogram.args = {
    layout: {
        width: 500,
        height: 500
    },
    data: [
        {
            x: [7, 8, 9],
            type: "histogram"
        }
    ]
};

export const PieChart = Template.bind({});
PieChart.args = {
    layout: {
        width: 500,
        height: 500
    },
    data: [
        {
            x: [1, 2, 3],
            y: [7, 8, 9],
            type: "pie",
            hole: 0.4
        }
    ]
};

export const RadarChart = Template.bind({});
RadarChart.args = {
    layout: {
        width: 500,
        height: 500
    },
    data: [
        {
            x: ['A','B','C', 'D', 'E', 'A'],
            y: [39, 28, 8, 7, 28, 39],
            type: "radar"
        }
    ]
};

export const Heatmap = Template.bind({});
Heatmap.args = {
    layout: {
        width: 500,
        height: 500
    },
    data: [
        {
            x: ['a', 'b', 'c', 'a', 'b', 'c'],
            y: ['d', 'd', 'd', 'e', 'e', 'e'],
            z: [1, 2, 3, 4, 5, 6],
            type: "heatmap",
            style: {
                colorScale: [
                    [0, 'blue'],
                    [0.5, 'green'],
                    [1, 'red']
                ]
            }
        }
    ]
};

export const BoxPlot = Template.bind({});
BoxPlot.args = {
    layout: {
        width: 500,
        height: 500
    },
    data: [
        {
            x: [1, 1, 1, 2, 2, 2, 3, 3, 3],
            y: [-1, -2, -3, 1, 2, 3, 4, 5, 6],
            type: "box"
        }
    ]
};