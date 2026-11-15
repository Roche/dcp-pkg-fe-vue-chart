import type { Meta, StoryFn } from "@storybook/vue3";
import DcpChart from "@/components/Chart.vue";
import { HorizontalAlign, VerticalAlign, ChartOrientation, AxisPosition, ChartLayout } from '@open-dcp/charts';

const meta: Meta<typeof DcpChart> = {
    title: "Layout",
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

const OverviewTemplate: StoryFn<typeof DcpChart> = () => ({
    components: { DcpChart },
    setup() {
        const overviewLayout = {
            width: 720,
            height: 420
        };

        const basePanelStyle = {
            border: '1px solid #d9d9df',
            borderRadius: '12px',
            padding: '16px',
            background: '#fff'
        };

        const chartConfigs = [
            {
                title: 'Default',
                args: {
                    ...defaultArgs,
                    layout: {
                        ...defaultArgs.layout,
                        ...overviewLayout
                    }
                }
            },
            {
                title: 'Multiple Left Axes',
                args: {
                    ...MultipleLeftAxes.args!,
                    layout: {
                        ...MultipleLeftAxes.args!.layout,
                        ...overviewLayout
                    }
                }
            },
            {
                title: 'Multiple Right Axes',
                args: {
                    ...MultipleRightAxes.args!,
                    layout: {
                        ...MultipleRightAxes.args!.layout,
                        ...overviewLayout
                    }
                }
            },
            {
                title: 'Legend Top Right',
                args: {
                    ...LegendTopRight.args!,
                    layout: {
                        ...LegendTopRight.args!.layout,
                        ...overviewLayout
                    }
                }
            },
            {
                title: 'Legend Bottom Center',
                args: {
                    ...LegendBottomCenter.args!,
                    layout: {
                        ...LegendBottomCenter.args!.layout,
                        ...overviewLayout
                    }
                }
            },
            {
                title: 'Legend Outside Right',
                args: {
                    ...LegendOutsideRight.args!,
                    layout: {
                        ...LegendOutsideRight.args!.layout,
                        ...overviewLayout
                    }
                }
            },
            {
                title: 'Extra Long Chart',
                panelStyle: {
                    gridColumn: '1 / -1'
                },
                args: {
                    ...LegendHorizontal.args!,
                    layout: {
                        ...LegendHorizontal.args!.layout,
                        width: 1480,
                        height: 360
                    }
                }
            },
            {
                title: 'Extra Long Multi-Axis Chart',
                panelStyle: {
                    gridColumn: '1 / -1'
                },
                args: {
                    showLegend: true,
                    layout: {
                        width: 1480,
                        height: 420,
                        style: {
                            legendPosition: {
                                x: 0.5,
                                y: 1.08,
                                xAlign: HorizontalAlign.Center,
                                yAlign: VerticalAlign.Bottom,
                                orientation: ChartOrientation.Horizontal
                            }
                        }
                    },
                    axes: [
                        { id: 'x', title: 'Month', position: AxisPosition.Bottom },
                        { id: 'y1', title: 'Temperature (°C)', position: AxisPosition.Left },
                        { id: 'y2', title: 'Rainfall (mm)', position: AxisPosition.Left },
                        { id: 'y3', title: 'Revenue ($k)', position: AxisPosition.Right },
                        { id: 'y4', title: 'Growth (%)', position: AxisPosition.Right },
                    ],
                    data: [
                        {
                            x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                            y: [2, 4, 9, 14, 19, 23, 26, 25],
                            type: 'scatter' as const,
                            mode: 'lines',
                            name: 'Temperature',
                            axis: { x: 'x', y: 'y1' }
                        },
                        {
                            x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                            y: [78, 64, 71, 55, 62, 49, 45, 52],
                            type: 'bar' as const,
                            name: 'Rainfall',
                            axis: { x: 'x', y: 'y2' }
                        },
                        {
                            x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                            y: [110, 118, 125, 138, 149, 156, 162, 171],
                            type: 'scatter' as const,
                            mode: 'lines+markers',
                            name: 'Revenue',
                            axis: { x: 'x', y: 'y3' }
                        },
                        {
                            x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                            y: [3, 7, 5, 10, 8, 6, 4, 9],
                            type: 'scatter' as const,
                            mode: 'lines+markers',
                            name: 'Growth',
                            axis: { x: 'x', y: 'y4' }
                        }
                    ]
                }
            }
        ];

        return { basePanelStyle, chartConfigs };
    },
    template: `
        <div
            style="
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(760px, 1fr));
                gap: 24px;
                align-items: start;
                padding: 16px;
            "
        >
            <section
                v-for="chart in chartConfigs"
                :key="chart.title"
                :style="[basePanelStyle, chart.panelStyle]"
            >
                <h3 style="margin: 0 0 16px; font-size: 16px; font-weight: 600;">
                    {{ chart.title }}
                </h3>
                <DcpChart v-bind="chart.args" />
            </section>
        </div>
    `
});

const defaultArgs = {
    layout: {
        width: 500,
        height: 500
    },
    axes: [
        { id: 'x', title: 'My X Axis', position: AxisPosition.Top },
        { id: 'y2', title: 'My 2Y Axis', position: AxisPosition.Right },
        { id: 'y', title: 'My Y Axis', position: AxisPosition.Left },
    ],
    data: [
        {
            x: [1, 2, 3],
            y: [7, 8, 9],
            type: "bar" as const,
            name: "My Bar Series",
            axis: {
                x: "x",
                y: "y2"
            }
        },
        {
            x: [1, 2, 3],
            y: [4, 5, 6],
            type: "scatter" as const,
            name: "My Series",
            axis: {
                x: "x",
                y: "y"
            }
        }
    ]
};

export const Default = Template.bind({});
Default.args = defaultArgs;

export const MultipleLeftAxes = Template.bind({});
MultipleLeftAxes.args = {
    layout: {
        width: 500,
        height: 500
    },
    axes: [
        { id: 'x', title: 'X Axis', position: AxisPosition.Bottom },
        { id: 'y1', title: 'Temperature (°C)', position: AxisPosition.Left },
        { id: 'y2', title: 'Pressure (bar)', position: AxisPosition.Left },
    ],
    data: [
        {
            x: [1, 2, 3, 4, 5],
            y: [20, 25, 22, 28, 24],
            type: "scatter" as const,
            mode: "lines",
            name: "Temperature",
            axis: { x: "x", y: "y1" }
        },
        {
            x: [1, 2, 3, 4, 5],
            y: [1.2, 1.5, 1.3, 1.8, 1.6],
            type: "scatter" as const,
            mode: "lines",
            name: "Pressure",
            axis: { x: "x", y: "y2" }
        }
    ]
};

export const MultipleRightAxes = Template.bind({});
MultipleRightAxes.args = {
    layout: {
        width: 500,
        height: 500
    },
    axes: [
        { id: 'x', title: 'Time', position: AxisPosition.Bottom },
        { id: 'y1', title: 'Speed (km/h)', position: AxisPosition.Right },
        { id: 'y2', title: 'Distance (km)', position: AxisPosition.Right },
    ],
    data: [
        {
            x: [0, 1, 2, 3, 4],
            y: [0, 50, 80, 90, 100],
            type: "scatter" as const,
            mode: "lines",
            name: "Speed",
            axis: { x: "x", y: "y1" }
        },
        {
            x: [0, 1, 2, 3, 4],
            y: [0, 25, 75, 150, 250],
            type: "scatter" as const,
            mode: "lines",
            name: "Distance",
            axis: { x: "x", y: "y2" }
        }
    ]
};

export const LegendTopRight = Template.bind({});
LegendTopRight.args = {
    ...defaultArgs,
    showLegend: true,
    layout: {
        ...defaultArgs.layout,
        style: {
            legendPosition: {
                x: 1,
                y: 1,
                xAlign: HorizontalAlign.Right,
                yAlign: VerticalAlign.Top
            }
        }
    }
};

export const LegendBottomCenter = Template.bind({});
LegendBottomCenter.args = {
    ...defaultArgs,
    showLegend: true,
    layout: {
        ...defaultArgs.layout,
        style: {
            legendPosition: {
                x: 0.5,
                y: -0.15,
                xAlign: HorizontalAlign.Center,
                yAlign: VerticalAlign.Top,
                orientation: ChartOrientation.Horizontal
            }
        }
    }
};

export const LegendHorizontal = Template.bind({});
LegendHorizontal.args = {
    ...defaultArgs,
    showLegend: true,
    layout: {
        ...defaultArgs.layout,
        style: {
            legendPosition: {
                x: 0.5,
                y: 1.1,
                xAlign: HorizontalAlign.Center,
                yAlign: VerticalAlign.Bottom,
                orientation: ChartOrientation.Horizontal
            }
        }
    }
};

export const LegendOutsideRight = Template.bind({});
LegendOutsideRight.args = {
    ...defaultArgs,
    showLegend: true,
    layout: {
        ...defaultArgs.layout,
        style: {
            legendPosition: {
                x: 1.02,
                y: 0.5,
                xAlign: HorizontalAlign.Left,
                yAlign: VerticalAlign.Middle,
                orientation: ChartOrientation.Vertical
            }
        }
    }
};

export const LegendWithMultipleLeftAxes = Template.bind({});
LegendWithMultipleLeftAxes.args = {
    ...MultipleLeftAxes.args,
    showLegend: true,
    layout: {
        width: 500,
        height: 500,
        style: {
            legendPosition: {
                x: 0,
                y: 1,
                xAlign: HorizontalAlign.Left,
                yAlign: VerticalAlign.Top
            }
        }
    }
};

export const LayoutOverview = OverviewTemplate.bind({});