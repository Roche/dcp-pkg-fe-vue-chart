import type { Meta, StoryFn } from "@storybook/vue3";
import DcpChart from "@/components/Chart.vue";

const meta: Meta<typeof DcpChart> = {
    title: "CategoryOrder",
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

export const CategoryOrderDaysOfWeek = Template.bind({});
CategoryOrderDaysOfWeek.args = {
    layout: {
        width: 600,
        height: 400
    },
    axes: [
        {
            id: 'x',
            title: 'Day of Week',
            position: 'bottom',
            categoryOrder: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        { id: 'y', title: 'Sales', position: 'left' }
    ],
    data: [
        {
            x: ['Wed', 'Mon', 'Fri', 'Sun', 'Tue'],
            y: [23, 45, 56, 78, 34],
            type: "bar",
            name: "Daily Sales",
            axis: { x: "x", y: "y" }
        }
    ]
};

export const CategoryOrderMonths = Template.bind({});
CategoryOrderMonths.args = {
    layout: {
        width: 700,
        height: 400
    },
    axes: [
        {
            id: 'x',
            title: 'Month',
            position: 'bottom',
            categoryOrder: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        { id: 'y', title: 'Revenue ($)', position: 'left' }
    ],
    data: [
        {
            x: ['Mar', 'Jan', 'Jun', 'Sep', 'Dec'],
            y: [45000, 38000, 52000, 48000, 61000],
            type: "scatter",
            mode: "lines+markers",
            name: "Q1-Q4 Revenue",
            axis: { x: "x", y: "y" }
        }
    ]
};

export const CategoryOrderCustomPriority = Template.bind({});
CategoryOrderCustomPriority.args = {
    layout: {
        width: 600,
        height: 400
    },
    axes: [
        {
            id: 'x',
            title: 'Priority Level',
            position: 'bottom',
            categoryOrder: ['Critical', 'High', 'Medium', 'Low']
        },
        { id: 'y', title: 'Count', position: 'left' }
    ],
    data: [
        {
            x: ['Low', 'Critical', 'Medium', 'High', 'Low', 'Critical'],
            y: [5, 12, 8, 15, 3, 9],
            type: "bar",
            name: "Issue Count",
            axis: { x: "x", y: "y" }
        }
    ]
};

export const CategoryOrderMultipleSeries = Template.bind({});
CategoryOrderMultipleSeries.args = {
    layout: {
        width: 700,
        height: 500
    },
    axes: [
        {
            id: 'x',
            title: 'Product Category',
            position: 'bottom',
            categoryOrder: ['Electronics', 'Clothing', 'Food', 'Books', 'Sports']
        },
        { id: 'y', title: 'Units Sold', position: 'left' }
    ],
    data: [
        {
            x: ['Food', 'Electronics', 'Books'],
            y: [120, 340, 180],
            type: "bar",
            name: "Q1",
            axis: { x: "x", y: "y" }
        },
        {
            x: ['Clothing', 'Electronics', 'Sports', 'Food'],
            y: [210, 380, 95, 140],
            type: "bar",
            name: "Q2",
            axis: { x: "x", y: "y" }
        }
    ]
};

export const CategoryOrderYAxisDepartments = Template.bind({});
CategoryOrderYAxisDepartments.args = {
    layout: {
        width: 600,
        height: 500
    },
    axes: [
        { id: 'x', title: 'Budget ($)', position: 'bottom' },
        { 
            id: 'y', 
            title: 'Department', 
            position: 'left',
            categoryOrder: ['Executive', 'Engineering', 'Sales', 'Marketing', 'HR', 'Operations']
        }
    ],
    data: [
        {
            x: [250000, 450000, 180000, 120000, 90000],
            y: ['Marketing', 'Engineering', 'Sales', 'HR', 'Operations'],
            type: "bar",
            name: "Annual Budget",
            axis: { x: "x", y: "y" },
            style: {
                orientation: "horizontal"
            }
        }
    ]
};

export const CategoryOrderYAxisRanking = Template.bind({});
CategoryOrderYAxisRanking.args = {
    layout: {
        width: 700,
        height: 600
    },
    axes: [
        { id: 'x', title: 'Score', position: 'bottom' },
        { 
            id: 'y', 
            title: 'Team', 
            position: 'left',
            categoryOrder: ['Team Alpha', 'Team Beta', 'Team Gamma', 'Team Delta', 'Team Epsilon', 'Team Zeta']
        }
    ],
    data: [
        {
            x: [95, 87, 92, 78, 85],
            y: ['Team Gamma', 'Team Alpha', 'Team Zeta', 'Team Delta', 'Team Beta'],
            type: "scatter",
            mode: "markers",
            name: "Q1 Performance",
            axis: { x: "x", y: "y" },
            style: {
                marker: {
                    size: 12
                }
            }
        },
        {
            x: [88, 91, 85, 82, 89],
            y: ['Team Beta', 'Team Gamma', 'Team Alpha', 'Team Delta', 'Team Epsilon'],
            type: "scatter",
            mode: "markers",
            name: "Q2 Performance",
            axis: { x: "x", y: "y" },
            style: {
                marker: {
                    size: 12
                }
            }
        }
    ]
};

// ...existing code...

export const RangeXAxis = Template.bind({});
RangeXAxis.args = {
    layout: {
        width: 600,
        height: 400
    },
    axes: [
        { 
            id: 'x', 
            title: 'Time (seconds)', 
            position: 'bottom',
            range: [-10, 20]
        },
        { id: 'y', title: 'Temperature (°C)', position: 'left' }
    ],
    data: [
        {
            x: [0, 2, 4, 6, 8, 10, 12, 14],
            y: [20, 25, 30, 35, 40, 45, 50, 55],
            type: "scatter",
            mode: "lines+markers",
            name: "Heating Curve",
            axis: { x: "x", y: "y" }
        }
    ]
};

export const RangeYAxis = Template.bind({});
RangeYAxis.args = {
    layout: {
        width: 600,
        height: 400
    },
    axes: [
        { id: 'x', title: 'Product', position: 'bottom' },
        { 
            id: 'y', 
            title: 'Price ($)', 
            position: 'left',
            range: [0, 150]
        }
    ],
    data: [
        {
            x: ['Widget A', 'Widget B', 'Widget C', 'Widget D'],
            y: [45, 120, 75, 90],
            type: "bar",
            name: "Product Prices",
            axis: { x: "x", y: "y" }
        }
    ]
};

export const RangeBothAxes = Template.bind({});
RangeBothAxes.args = {
    layout: {
        width: 700,
        height: 500
    },
    axes: [
        { 
            id: 'x', 
            title: 'Time (hours)', 
            position: 'bottom',
            range: [0, 24]
        },
        { 
            id: 'y', 
            title: 'Power Consumption (kW)', 
            position: 'left',
            range: [0, 50]
        }
    ],
    data: [
        {
            x: [0, 6, 12, 18, 24],
            y: [10, 35, 45, 30, 15],
            type: "scatter",
            mode: "lines",
            name: "Daily Load Profile",
            axis: { x: "x", y: "y" }
        }
    ]
};

export const RangeWithCategoryOrder = Template.bind({});
RangeWithCategoryOrder.args = {
    layout: {
        width: 700,
        height: 500
    },
    axes: [
        { 
            id: 'x', 
            title: 'Quarter', 
            position: 'bottom',
            categoryOrder: ['Q1', 'Q2', 'Q3', 'Q4']
        },
        { 
            id: 'y', 
            title: 'Revenue ($M)', 
            position: 'left',
            range: [0, 100]
        }
    ],
    data: [
        {
            x: ['Q2', 'Q4', 'Q1', 'Q3'],
            y: [75, 95, 65, 85],
            type: "bar",
            name: "2024 Revenue",
            axis: { x: "x", y: "y" }
        },
        {
            x: ['Q1', 'Q2', 'Q3', 'Q4'],
            y: [60, 70, 78, 88],
            type: "scatter",
            mode: "lines+markers",
            name: "2023 Revenue",
            axis: { x: "x", y: "y" }
        }
    ]
};