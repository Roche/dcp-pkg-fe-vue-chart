import type { Meta, StoryFn } from "@storybook/vue3";
import DcpChart from "@/components/Chart.vue";

const meta: Meta<typeof DcpChart> = {
    title: "Multiple Traces",
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

export const MultipleScatters = Template.bind({});
MultipleScatters.args = {
    layout: {
        width: 500,
        height: 500
    },
    data: [
        {
            x: [1, 2, 3],
            y: [4, 5, 6],
            type: "scatter",
            name: "Series 1"
        },
        {
            x: [1, 2, 3],
            y: [7, 8, 9],
            type: "scatter",
            name: "Series 2"
        }
    ]
};

export const MultipleBars = Template.bind({});
MultipleBars.args = {
    layout: {
        width: 500,
        height: 500
    },
    data: [
        {
            x: ['A', 'B', 'C'],
            y: [10, 20, 30],
            type: "bar",
            name: "Series 1"
        },
        {
            x: ['A', 'B', 'C'],
            y: [15, 25, 35],
            type: "bar",
            name: "Series 2"
        }
    ]
};

export const BarAndScatter = Template.bind({});
BarAndScatter.args = {
    layout: {
        width: 500,
        height: 500
    },
    data: [
        {
            x: [1, 2, 3],
            y: [10, 15, 13],
            type: "bar",
            name: "Bar"
        },
        {
            x: [1, 2, 3],
            y: [12, 9, 15],
            type: "scatter",
            mode: "lines+markers",
            name: "Scatter"
        }
    ]
};

export const MultipleBoxes = Template.bind({});
MultipleBoxes.args = {
    layout: {
        width: 500,
        height: 500
    },
    data: [
        {
            x: [1, 2, 3, 4, 5],
            y: [4, 5, 6, 7, 8],
            type: "box",
            name: "Box 1"
        },
        {
            x: [2, 3, 4, 5, 6],
            y: [2, 3, 4, 5, 6],
            type: "box",
            name: "Box 2"
        }
    ]
};

export const MultiplePies = Template.bind({});
MultiplePies.args = {
    layout: {
        width: 500,
        height: 500
    },
    data: [
        {
            x: ['A', 'B', 'C'],
            y: [10, 20, 30],
            type: "pie",
            name: "Pie 1"
        },
        {
            x: ['D', 'E', 'F'],
            y: [15, 25, 35],
            type: "pie",
            name: "Pie 2"
        }
    ]
};

export const MultipleRadars = Template.bind({});
MultipleRadars.args = {
    layout: {
        width: 500,
        height: 500
    },
    data: [
        {
            x: ['Speed', 'Reliability', 'Comfort', 'Safety', 'Efficiency'],
            y: [90, 80, 85, 70, 95],
            type: "radar",
            name: "Car A"
        },
        {
            x: ['Speed', 'Reliability', 'Comfort', 'Safety', 'Efficiency'],
            y: [70, 60, 75, 90, 85],
            type: "radar",
            name: "Car B"
        }
    ]
};