import type { Meta, StoryFn } from "@storybook/vue3";
import DcpChart from "@/components/Chart.vue";

const meta: Meta<typeof DcpChart> = {
    title: "Styles",
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

export const BackgroundColor = Template.bind({});
BackgroundColor.args = {
    layout: {
        width: 500,
        height: 500,
        style: {
            backgroundColor: "#f5f5f5"
        }
    },
    data: [
        {
            x: [1, 2, 3],
            y: [4, 5, 6],
            type: "scatter",
            name: "Series 1"
        }
    ]
};

export const ForceLegend = Template.bind({});
ForceLegend.args = {
    layout: {
        width: 500,
        height: 500,
        style: {
            forceLegend: true
        }
    },
    data: [
        {
            x: [1, 2, 3, 4, 5],
            y: [1, 3, 2, 4, 3],
            type: "scatter",
            name: "Single Series"
        }
    ]
};

export const CombinedStyles = Template.bind({});
CombinedStyles.args = {
    layout: {
        width: 500,
        height: 500,
        style: {
            backgroundColor: "#1e1e1e",
            forceLegend: true
        }
    },
    data: [
        {
            x: [1, 2, 3, 4, 5],
            y: [1, 3, 2, 4, 3],
            type: "scatter",
            name: "Dark Theme",
            mode: "lines+markers",
            style: {
                line: {
                    color: "#00ff00",
                    width: 2
                },
                marker: {
                    color: "#00ff00",
                    size: 8
                }
            }
        }
    ]
};