import type { Meta, StoryFn } from "@storybook/vue3";
import { ChartShapeType } from "@open-dcp/charts";
import DcpChart from "@/components/Chart.vue";

const meta: Meta<typeof DcpChart> = {
    title: "Shapes",
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

export const Shapes = Template.bind({});
Shapes.args = {
    layout: {
        width: 500,
        height: 500
    },
    data: [
        {
            x: [1, 2, 3],
            y: [4, 5, 6],
            type: "scatter"
        },
        {
            x: [1, 2, 3],
            y: [7, 8, 9],
            type: "bar"
        }
    ],
    shapes: [
        {
            type: ChartShapeType.HorizontalLine,
            y: 4
        },
        {
            type: ChartShapeType.VerticalLine,
            x: 2,
            line: {
                color: 'red',
                width: 2,
                dash: 'dash'
            }
        },
        {
            type: ChartShapeType.Line,
            x0: 1,
            y0: 4,
            x1: 2,
            y1: 5,
            line: {
                color: 'blue',
                width: 2,
                dash: 'solid'
            }
        },
        {
            type: ChartShapeType.Rectangle,
            x0: 2,
            y0: 5,
            x1: 3,
            y1: 8,
            fillColor: 'rgba(0, 255, 0, 0.2)',
        },
        {
            type: ChartShapeType.Circle,
            x0: 1.5,
            y0: 4.5,
            x1: 2.5,
            y1: 6.5,
            fillColor: 'rgba(255, 0, 0, 0.2)',
        }
    ]
};