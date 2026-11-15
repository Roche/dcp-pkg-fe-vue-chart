import type { Meta, StoryFn } from "@storybook/vue3";
import DcpChart from "@/components/Chart.vue";
import { AxisPosition } from '@open-dcp/charts';

const meta: Meta<typeof DcpChart> = {
    title: "Multiple Y Axes",
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

export const TwoYAxes = Template.bind({});
TwoYAxes.args = {
    layout: {
        width: 600,
        height: 400
    },
    axes: [
        { id: 'x', title: 'Time', position: AxisPosition.Bottom },
        { id: 'y1', title: 'Temperature (°C)', position: AxisPosition.Left },
        { id: 'y2', title: 'Pressure (hPa)', position: AxisPosition.Right },
    ],
    data: [
        {
            x: [1, 2, 3, 4, 5],
            y: [20, 22, 19, 24, 21],
            type: "scatter" as const,
            mode: "lines+markers",
            name: "Temperature",
            axis: { x: "x", y: "y1" }
        },
        {
            x: [1, 2, 3, 4, 5],
            y: [1013, 1010, 1015, 1008, 1012],
            type: "scatter" as const,
            mode: "lines+markers",
            name: "Pressure",
            axis: { x: "x", y: "y2" }
        }
    ]
};

export const BarAndLineWithTwoYAxes = Template.bind({});
BarAndLineWithTwoYAxes.args = {
    layout: {
        width: 600,
        height: 400
    },
    axes: [
        { id: 'x', title: 'Quarter', position: AxisPosition.Bottom },
        { id: 'y1', title: 'Revenue ($)', position: AxisPosition.Left },
        { id: 'y2', title: 'Growth (%)', position: AxisPosition.Right },
    ],
    data: [
        {
            x: ["Q1", "Q2", "Q3", "Q4"],
            y: [150000, 180000, 210000, 240000],
            type: "bar" as const,
            name: "Revenue",
            axis: { x: "x", y: "y1" }
        },
        {
            x: ["Q1", "Q2", "Q3", "Q4"],
            y: [5, 20, 16.7, 14.3],
            type: "scatter" as const,
            mode: "lines+markers",
            name: "Growth",
            axis: { x: "x", y: "y2" }
        }
    ]
};

export const ThreeYAxes = Template.bind({});
ThreeYAxes.args = {
    layout: {
        width: 700,
        height: 450
    },
    axes: [
        { id: 'x', title: 'Day', position: AxisPosition.Bottom },
        { id: 'y1', title: 'Temperature (°C)', position: AxisPosition.Left },
        { id: 'y2', title: 'Humidity (%)', position: AxisPosition.Right },
        { id: 'y3', title: 'Wind Speed (km/h)', position: AxisPosition.Right },
    ],
    data: [
        {
            x: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            y: [18, 21, 19, 23, 25, 22, 20],
            type: "scatter" as const,
            mode: "lines+markers",
            name: "Temperature",
            axis: { x: "x", y: "y1" }
        },
        {
            x: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            y: [65, 70, 60, 55, 50, 58, 63],
            type: "scatter" as const,
            mode: "lines+markers",
            name: "Humidity",
            axis: { x: "x", y: "y2" }
        },
        {
            x: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            y: [12, 15, 20, 18, 10, 8, 14],
            type: "bar" as const,
            name: "Wind Speed",
            axis: { x: "x", y: "y3" }
        }
    ]
};

export const FourYAxesSplitLeftRight = Template.bind({});
FourYAxesSplitLeftRight.args = {
    layout: {
        width: 800,
        height: 480
    },
    axes: [
        { id: 'x', title: 'Month', position: AxisPosition.Bottom },
        { id: 'y1', title: 'Revenue (k$)', position: AxisPosition.Left },
        { id: 'y2', title: 'Orders', position: AxisPosition.Left },
        { id: 'y3', title: 'Conversion (%)', position: AxisPosition.Right },
        { id: 'y4', title: 'NPS', position: AxisPosition.Right },
    ],
    data: [
        {
            x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            y: [180, 210, 230, 250, 240, 270],
            type: 'bar' as const,
            name: 'Revenue',
            axis: { x: 'x', y: 'y1' }
        },
        {
            x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            y: [920, 980, 1100, 1230, 1180, 1310],
            type: 'scatter' as const,
            mode: 'lines+markers',
            name: 'Orders',
            axis: { x: 'x', y: 'y2' }
        },
        {
            x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            y: [2.6, 2.9, 3.4, 3.1, 3.6, 3.8],
            type: 'scatter' as const,
            mode: 'lines+markers',
            name: 'Conversion',
            axis: { x: 'x', y: 'y3' }
        },
        {
            x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            y: [41, 44, 47, 46, 49, 52],
            type: 'scatter' as const,
            mode: 'lines+markers',
            name: 'NPS',
            axis: { x: 'x', y: 'y4' }
        }
    ]
};

export const SevenYAxesThreeLeftFourRight = Template.bind({});
SevenYAxesThreeLeftFourRight.args = {
    layout: {
        width: 920,
        height: 540
    },
    axes: [
        { id: 'x', title: 'Week', position: AxisPosition.Bottom },
        { id: 'y1', title: 'Revenue (k$)', position: AxisPosition.Left },
        { id: 'y2', title: 'Orders', position: AxisPosition.Left },
        { id: 'y3', title: 'Support Tickets', position: AxisPosition.Left },
        { id: 'y4', title: 'Conversion (%)', position: AxisPosition.Right },
        { id: 'y5', title: 'NPS', position: AxisPosition.Right },
        { id: 'y6', title: 'Avg Session (min)', position: AxisPosition.Right },
        { id: 'y7', title: 'Churn (%)', position: AxisPosition.Right },
    ],
    data: [
        {
            x: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6'],
            y: [120, 140, 135, 160, 170, 180],
            type: 'bar' as const,
            name: 'Revenue',
            axis: { x: 'x', y: 'y1' }
        },
        {
            x: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6'],
            y: [610, 640, 628, 700, 730, 760],
            type: 'scatter' as const,
            mode: 'lines+markers',
            name: 'Orders',
            axis: { x: 'x', y: 'y2' }
        },
        {
            x: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6'],
            y: [48, 44, 52, 41, 39, 36],
            type: 'scatter' as const,
            mode: 'lines+markers',
            name: 'Support Tickets',
            axis: { x: 'x', y: 'y3' }
        },
        {
            x: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6'],
            y: [2.5, 2.8, 2.7, 3.0, 3.2, 3.4],
            type: 'scatter' as const,
            mode: 'lines+markers',
            name: 'Conversion',
            axis: { x: 'x', y: 'y4' }
        },
        {
            x: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6'],
            y: [38, 40, 42, 44, 43, 46],
            type: 'scatter' as const,
            mode: 'lines+markers',
            name: 'NPS',
            axis: { x: 'x', y: 'y5' }
        },
        {
            x: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6'],
            y: [5.4, 5.8, 5.6, 6.1, 6.4, 6.7],
            type: 'scatter' as const,
            mode: 'lines+markers',
            name: 'Avg Session',
            axis: { x: 'x', y: 'y6' }
        },
        {
            x: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6'],
            y: [4.2, 4.1, 4.0, 3.8, 3.7, 3.5],
            type: 'scatter' as const,
            mode: 'lines+markers',
            name: 'Churn',
            axis: { x: 'x', y: 'y7' }
        }
    ]
};
