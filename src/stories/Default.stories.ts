import type { Meta, StoryFn } from "@storybook/vue3";
import DcpChart from "@/components/Chart.vue";

const meta: Meta<typeof DcpChart> = {
    title: "Default",
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

export const Default = Template.bind({});
Default.args = {
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
    ]
};