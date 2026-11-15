import type { Meta, StoryFn } from "@storybook/vue3";
import DcpChart from "@/components/Chart.vue";
import { ChartEventType, InteractionMode, SelectMode } from "@open-dcp/charts";
import { ref } from "vue";

const meta: Meta<typeof DcpChart> = {
    title: "Interactions",
    component: DcpChart
};
export default meta;

const Template: StoryFn<typeof DcpChart> = (args) => ({
    components: { DcpChart },
    setup() {
        const eventLog = ref<string[]>([]);

        const logEvent = (eventName: string, data: any) => {
            const message = `${eventName}: ${JSON.stringify(data.points.map((p: any) => ({ x: p.x, y: p.y, series: p.seriesName })))}`;
            eventLog.value.unshift(message);
            if (eventLog.value.length > 10) {
                eventLog.value.pop();
            }
        };

        const chartArgs = {
            ...args,
            events: {
                [ChartEventType.Click]: (data: any) => logEvent('Click', data),
                [ChartEventType.Hover]: (data: any) => logEvent('Hover', data),
                [ChartEventType.Select]: (data: any) => logEvent('Select', data),
            }
        };

        return { chartArgs, eventLog };
    },
    template: `
        <div>
            <DcpChart v-bind="chartArgs" />
            <div style="margin-top: 20px; padding: 10px; background: #f5f5f5; border-radius: 4px;">
                <h3 style="margin: 0 0 10px 0;">Event Log:</h3>
                <div v-if="eventLog.length === 0" style="color: #999;">
                    Interact with the chart to see events...
                </div>
                <div v-for="(log, index) in eventLog" :key="index" 
                     style="font-family: monospace; font-size: 12px; padding: 4px; border-bottom: 1px solid #ddd;">
                    {{ log }}
                </div>
            </div>
        </div>
    `,
});

export const ClickInteraction = Template.bind({});
ClickInteraction.args = {
    layout: {
        width: 500,
        height: 400
    },
    interactionMode: InteractionMode.None,
    data: [
        {
            
            x: [1, 2, 3, 4, 5],
            y: [4, 5, 6, 7, 8],
            type: "scatter",
            mode: "markers",
            name: "Series 1",
            style: {
                marker: { size: 12, color: 'red' }
            }
        },
        {
            x: [1, 2, 3, 4, 5],
            y: [7, 8, 9, 10, 11],
            type: "scatter",
            mode: "markers",
            name: "Series 2",
            style: {
                marker: { color: 'blue' }
            }
        }
    ]
};

export const BoxSelectInteraction = Template.bind({});
BoxSelectInteraction.args = {
    layout: {
        width: 500,
        height: 400
    },
    interactionMode: InteractionMode.Select,
    selectMode: SelectMode.Box,
    data: [
        {
            x: Array.from({ length: 50 }, () => Math.random() * 10),
            y: Array.from({ length: 50 }, () => Math.random() * 10),
            type: "scatter",
            mode: "markers",
            name: "Random Data",
            style: {
                marker: {
                    size: 8,
                    color: '#2ca02c',
                    opacity: 0.7
                }
            }
        }
    ]
};

export const LassoSelectInteraction = Template.bind({});
LassoSelectInteraction.args = {
    layout: {
        width: 500,
        height: 400
    },
    interactionMode: InteractionMode.Select,
    selectMode: SelectMode.Lasso,
    data: [
        {
            x: Array.from({ length: 50 }, () => Math.random() * 10),
            y: Array.from({ length: 50 }, () => Math.random() * 10),
            type: "scatter",
            mode: "markers",
            name: "Dataset A",
            style: {
                marker: {
                    size: 10,
                    color: '#1f77b4'
                }
            }
        }
    ]
};