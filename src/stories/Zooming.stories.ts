import type { Meta, StoryFn } from "@storybook/vue3";
import DcpChart from "@/components/Chart.vue";
import { InteractionMode } from "@open-dcp/charts";
import { computed } from "vue";

const meta: Meta<any> = {
    title: "Zooming",
    component: DcpChart,
    argTypes: {
        disableDoubleClick: {
            control: "boolean",
            description: "Disable Plotly double-click zoom reset"
        }
    }
};

export default meta;

const Template: StoryFn<any> = (args) => ({
    components: { DcpChart },
    setup() {
        const chartArgs = computed(() => {
            const { disableDoubleClick, ...rest } = args;
            return {
                ...rest,
                options: {
                    ...(rest.options ?? {}),
                    doubleClick: disableDoubleClick ? false : "reset+autosize"
                }
            };
        });

        return { chartArgs };
    },
    template: '<DcpChart v-bind="chartArgs" />'
});

export const ZoomWithDoubleClickToggle = Template.bind({});
ZoomWithDoubleClickToggle.args = {
    disableDoubleClick: false,
    layout: {
        width: 700,
        height: 420
    },
    interactionMode: InteractionMode.Zoom,
    showModeBar: true,
    modeBarOptions: {
        scrollZoom: true,
        displaylogo: false
    },
    data: [
        {
            x: [1, 2, 3, 4, 5, 6, 7, 8],
            y: [10, 13, 11, 16, 14, 18, 17, 21],
            type: "scatter",
            mode: "lines+markers",
            name: "Series A"
        }
    ]
};
