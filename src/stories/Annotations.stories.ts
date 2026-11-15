import type { Meta, StoryFn } from "@storybook/vue3";
import DcpChart from "@/components/Chart.vue";

const meta: Meta<typeof DcpChart> = {
    title: "Annotations",
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

export const Basic = Template.bind({});
Basic.args = {
    layout: {
        width: 500,
        height: 500
    },
    data: [
        {
            x: [1, 2, 3, 4],
            y: [4, 7, 5, 9],
            type: "scatter"
        }
    ],
    annotations: [
        {
            text: "Local max",
            x: 2,
            y: 7,
            showArrow: true,
            style: {
                color: "#111827",
                backgroundColor: "#fde68a",
                fontSize: 12
            }
        },
        {
            text: "Target",
            x: 4,
            y: 9,
            xShift: 20,
            yShift: -20,
            showArrow: false,
            style: {
                color: "#ffffff",
                backgroundColor: "#2563eb",
                fontSize: 12
            }
        }
    ]
};
