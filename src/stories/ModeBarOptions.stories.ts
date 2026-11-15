import type { Meta, StoryFn } from "@storybook/vue3";
import DcpChart from "@/components/Chart.vue";
import type { ChartSeries } from "@open-dcp/charts";

const meta: Meta<typeof DcpChart> = {
    title: "ModeBar Options",
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

const baseData: ChartSeries[] = [
    {
        x: [1, 2, 3, 4, 5],
        y: [3, 1, 4, 1, 5],
        type: "scatter",
        mode: "lines+markers",
        name: "Series A"
    }
];

const baseLayout = {
    width: 700,
    height: 420
};

export const RemoveButtonsAndEnableScrollZoom = Template.bind({});
RemoveButtonsAndEnableScrollZoom.args = {
    layout: baseLayout,
    data: baseData,
    showModeBar: true,
    modeBarOptions: {
        modeBarButtonsToRemove: ["pan2d", "select2d", "lasso2d", "autoScale2d", "resetScale2d"],
        scrollZoom: true,
        displaylogo: false
    }
};

export const AddButtonsCanonical = Template.bind({});
AddButtonsCanonical.args = {
    layout: baseLayout,
    data: baseData,
    showModeBar: true,
    modeBarOptions: {
        modeBarButtonsToAdd: [],
        modeBarButtonsToRemove: ["zoom2d", "toImage"],
        scrollZoom: true,
        displaylogo: false
    }
};
