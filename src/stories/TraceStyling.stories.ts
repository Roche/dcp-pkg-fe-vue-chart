import type { Meta, StoryFn } from "@storybook/vue3";
import DcpChart from "@/components/Chart.vue";

const meta: Meta<typeof DcpChart> = {
    title: "Trace Styling",
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

export const Styled = Template.bind({});
Styled.args = {
    layout: {
        width: 500,
        height: 500
    },
    showModeBar: 'hover',
    data: [
        {
            x: [1, 2, 3],
            y: [4, 5, 6],
            type: "scatter",
            name: "Custom Scatter",
            mode: "lines+markers",
            style: {
                marker: {
                    color: "#e91e63",
                    size: 12
                },
                line: {
                    color: "#3f51b5",
                    width: 4
                }
            }
        },
        {
            x: [1, 2, 3],
            y: [7, 8, 9],
            type: "bar",
            name: "Custom Bar",
            style: {
                marker: {
                    color: "#4caf50"
                }
            }
        }
    ]
};


export const StyledRadar = Template.bind({});
StyledRadar.args = {
    layout: {
        width: 500,
        height: 500
    },
    showModeBar: 'hover',
    data: [
        {
            x: ['A', 'B', 'C'],
            y: [4, 5, 6],
            type: "radar",
            name: "Custom Scatter",
            mode: "lines+markers",
            style: {
                marker: {
                    color: "#e91e63",
                    size: 12
                },
                line: {
                    color: "#3f51b5",
                    width: 4
                }
            }
        },
        {
            x: ['A', 'B', 'C'],
            y: [7, 8, 9],
            type: "radar",
            name: "Custom Bar",
            style: {
                marker: {
                    color: "#4caf50"
                }
            }
        }
    ]
};

export const LineTypes = Template.bind({});
LineTypes.args = {
    layout: {
        width: 800,
        height: 500
    },
    showModeBar: 'hover',
    data: [
        {
            x: [1, 2, 3, 4, 5],
            y: [1, 3, 2, 4, 3],
            type: "scatter",
            name: "Solid Line",
            mode: "lines",
            style: {
                line: {
                    color: "#3f51b5",
                    width: 3,
                    dash: "solid"
                }
            }
        },
        {
            x: [1, 2, 3, 4, 5],
            y: [2, 4, 3, 5, 4],
            type: "scatter",
            name: "Dashed Line",
            mode: "lines",
            style: {
                line: {
                    color: "#e91e63",
                    width: 3,
                    dash: "dash"
                }
            }
        },
        {
            x: [1, 2, 3, 4, 5],
            y: [3, 5, 4, 6, 5],
            type: "scatter",
            name: "Dotted Line",
            mode: "lines",
            style: {
                line: {
                    color: "#4caf50",
                    width: 3,
                    dash: "dot"
                }
            }
        },
        {
            x: [1, 2, 3, 4, 5],
            y: [4, 6, 5, 7, 6],
            type: "scatter",
            name: "Dash-Dot Line",
            mode: "lines",
            style: {
                line: {
                    color: "#ff9800",
                    width: 3,
                    dash: "dashdot"
                }
            }
        }
    ]
};

export const AreaFills = Template.bind({});
AreaFills.args = {
    layout: {
        width: 800,
        height: 500
    },
    showModeBar: 'hover',
    data: [
        {
            x: [1, 2, 3, 4, 5],
            y: [1, 3, 2, 4, 3],
            type: "scatter",
            name: "Fill to Zero",
            mode: "lines",
            fill: "tozeroy",
            style: {
                line: {
                    color: "#3f51b5",
                    width: 2
                },
                marker: {
                    color: "rgba(63, 81, 181, 0.3)"
                }
            }
        },
        {
            x: [1, 2, 3, 4, 5],
            y: [2, 4, 3, 5, 4],
            type: "scatter",
            name: "Fill to Next",
            mode: "lines",
            fill: "tonexty",
            style: {
                line: {
                    color: "#e91e63",
                    width: 2
                },
                marker: {
                    color: "rgba(233, 30, 99, 0.3)"
                }
            }
        },
        {
            x: [1, 2, 3, 4, 5],
            y: [3, 5, 4, 6, 5],
            type: "scatter",
            name: "No Fill",
            mode: "lines",
            style: {
                line: {
                    color: "#4caf50",
                    width: 2
                }
            }
        }
    ]
};

export const CombinedStyles = Template.bind({});
CombinedStyles.args = {
    layout: {
        width: 800,
        height: 500
    },
    showModeBar: 'hover',
    data: [
        {
            x: [1, 2, 3, 4, 5],
            y: [1, 3, 2, 4, 3],
            type: "scatter",
            name: "Solid with Fill",
            mode: "lines+markers",
            fill: "tozeroy",
            style: {
                line: {
                    color: "#3f51b5",
                    width: 3,
                    dash: "solid"
                },
                marker: {
                    color: "#3f51b5",
                    size: 8
                }
            }
        },
        {
            x: [1, 2, 3, 4, 5],
            y: [2, 4, 3, 5, 4],
            type: "scatter",
            name: "Dashed with Fill to Next",
            mode: "lines+markers",
            fill: "tonexty",
            style: {
                line: {
                    color: "#e91e63",
                    width: 3,
                    dash: "dash"
                },
                marker: {
                    color: "#e91e63",
                    size: 8
                }
            }
        },
        {
            x: [1, 2, 3, 4, 5],
            y: [3, 5, 4, 6, 5],
            type: "scatter",
            name: "Dotted No Fill",
            mode: "lines+markers",
            style: {
                line: {
                    color: "#4caf50",
                    width: 3,
                    dash: "dot"
                },
                marker: {
                    color: "#4caf50",
                    size: 8
                }
            }
        }
    ]
};