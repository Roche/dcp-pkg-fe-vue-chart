import type { Meta, StoryFn } from "@storybook/vue3";
import DcpChart from "@/components/Chart.vue";
import { AxisPosition } from "@open-dcp/charts";

const meta: Meta<typeof DcpChart> = {
    title: "Gridlines",
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

export const GridlinesEnabled = Template.bind({});
GridlinesEnabled.args = {
    layout: {
        width: 700,
        height: 420
    },
    axes: [
        {
            id: "x",
            title: "Month",
            position: AxisPosition.Bottom,
            gridlines: {
                show: true,
                color: "#D1D5DB",
                width: 1
            }
        },
        {
            id: "y",
            title: "Sales",
            position: AxisPosition.Left,
            gridlines: {
                show: true,
                color: "#9CA3AF",
                width: 1
            }
        }
    ],
    data: [
        {
            x: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            y: [120, 155, 148, 172, 190, 210],
            type: "scatter" as const,
            mode: "lines+markers",
            name: "Sales",
            axis: { x: "x", y: "y" }
        }
    ]
};

export const ColorCodedGridlines = Template.bind({});
ColorCodedGridlines.args = {
    layout: {
        width: 760,
        height: 460
    },
    axes: [
        {
            id: "x",
            title: "Sprint",
            position: AxisPosition.Bottom,
            gridlines: {
                show: true,
                color: "#C7D2FE",
                width: 1
            }
        },
        {
            id: "y",
            title: "Velocity",
            position: AxisPosition.Left,
            gridlines: {
                show: true,
                color: "#FBCFE8",
                width: 1
            }
        }
    ],
    data: [
        {
            x: ["S1", "S2", "S3", "S4", "S5", "S6"],
            y: [28, 31, 30, 34, 33, 37],
            type: "scatter" as const,
            mode: "lines+markers",
            name: "Velocity",
            axis: { x: "x", y: "y" },
            style: {
                line: {
                    color: "#4F46E5",
                    width: 3
                },
                marker: {
                    color: "#DB2777",
                    size: 8
                }
            }
        }
    ]
};

export const BoldGridlinesWithDualAxis = Template.bind({});
BoldGridlinesWithDualAxis.args = {
    layout: {
        width: 820,
        height: 480
    },
    axes: [
        {
            id: "x",
            title: "Quarter",
            position: AxisPosition.Bottom,
            gridlines: {
                show: true,
                color: "#CBD5E1",
                width: 2
            }
        },
        {
            id: "y1",
            title: "Revenue (k$)",
            position: AxisPosition.Left,
            gridlines: {
                show: true,
                color: "#94A3B8",
                width: 2
            }
        },
        {
            id: "y2",
            title: "Conversion (%)",
            position: AxisPosition.Right,
            gridlines: {
                show: true,
                color: "#FCA5A5",
                width: 1
            }
        }
    ],
    data: [
        {
            x: ["Q1", "Q2", "Q3", "Q4"],
            y: [140, 165, 180, 205],
            type: "bar" as const,
            name: "Revenue",
            axis: { x: "x", y: "y1" },
            style: {
                marker: {
                    color: "#0EA5E9"
                }
            }
        },
        {
            x: ["Q1", "Q2", "Q3", "Q4"],
            y: [2.4, 2.8, 3.3, 3.7],
            type: "scatter" as const,
            mode: "lines+markers",
            name: "Conversion",
            axis: { x: "x", y: "y2" },
            style: {
                line: {
                    color: "#EF4444",
                    width: 3,
                    dash: "dash"
                },
                marker: {
                    color: "#EF4444",
                    size: 8
                }
            }
        }
    ]
};
