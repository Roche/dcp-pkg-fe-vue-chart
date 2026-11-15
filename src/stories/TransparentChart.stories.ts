import type { Meta, StoryFn } from "@storybook/vue3";
import DcpChart from "@/components/Chart.vue";

const meta: Meta<typeof DcpChart> = {
    title: "Transparent",
    component: DcpChart
};
export default meta;

const Template: StoryFn<typeof DcpChart> = (args) => ({
    components: { DcpChart },
    template: '<div style="padding: 10px; background: red"><DcpChart v-bind="args" /></div>',
    setup() {
        return { args };
    },
});

export const Transparent = Template.bind({});
Transparent.args = {
    layout: {
        width: 500,
        height: 500,
        style: {
            backgroundColor: "transparent"
        }
    },
    axes: [
        { id: 'x', title: 'X Axis', position: 'bottom' },
        { id: 'y1', title: 'Temperature (°C)', position: 'left' }
    ],
    data: [
        {
            x: [1, 2, 3, 4, 5],
            y: [20, 25, 22, 28, 24],
            type: "scatter" as const,
            mode: "lines",
            name: "Temperature",
            axis: { x: "x", y: "y1" }
        }
    ]
};