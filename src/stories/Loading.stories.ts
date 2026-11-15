import type { Meta, StoryFn } from "@storybook/vue3";
import DcpChart from "@/components/Chart.vue";
import { markRaw } from "vue";

const CustomLoading = markRaw({
    template: `<div style="padding:2rem; text-align:center; color:#888;">
        <span class="loader" style="font-size:2rem;">⏳</span>
        <div>Loading chart, please wait...</div>
    </div>`
});

const meta: Meta<typeof DcpChart> = {
    title: "Loading",
    component: DcpChart
};
export default meta;

const Template: StoryFn<typeof DcpChart> = (args) => ({
    components: { DcpChart },
    template: '<DcpChart v-bind="args" />',
    setup() {
        return { args };
    },
});

export const Default = Template.bind({});
Default.args = {};

export const LoadingComponent = Template.bind({});
LoadingComponent.args = {
    loadingPlaceholder: CustomLoading
};