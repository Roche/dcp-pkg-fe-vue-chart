import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest';
import { enableAutoUnmount, mount } from '@vue/test-utils';
import { nextTick, reactive } from 'vue';

enableAutoUnmount(afterEach);

vi.mock('@open-dcp/charts', () => {
  class ChartService {
    setConfig() {}
    mount() {}
    deselect() {}
    setInteractionMode() {}
    setSelectMode() {}
    destroy() {}
  }

  class PlotlyAdapter {}

  return {
    ChartService,
    PlotlyAdapter,
    InteractionMode: { None: 'None', Zoom: 'Zoom', Pan: 'Pan' },
    SelectMode: { Box: 'Box', Lasso: 'Lasso' },
  };
});

import { ChartService, InteractionMode, SelectMode } from '@open-dcp/charts';
import type { DcpAxisConfig } from '@/index';
import DcpChart from '../Chart.vue';
import ChartPlaceholder from '../ChartPlaceholder.vue';

const DcpChartEventType = {
  ViewChange: 'ViewChange',
  Action: 'Action',
} as const;

describe('Chart.vue', () => {
  it('should render loading placeholder when layout dimensions are missing', () => {
    const wrapper = mount(DcpChart, {
      props: {
        data: [],
        layout: {
            width: 100,
            height: 0
        }
      }
    });

    expect(wrapper.findComponent(ChartPlaceholder).exists()).toBe(true);
  });

  describe('lifecycle and sizing', () => {
    const props = {
      chartId: 'cached-page-chart',
      data: [{ x: [1, 2], y: [3, 4] }],
      layout: { width: 600, height: 400 }
    };

    beforeEach(() => {
      vi.useFakeTimers();
      vi.spyOn(ChartService.prototype, 'setConfig');
      vi.spyOn(ChartService.prototype, 'mount');
      vi.spyOn(ChartService.prototype, 'destroy');
    });

    afterEach(() => {
      vi.useRealTimers();
      vi.restoreAllMocks();
    });

    it('destroys each instance exactly once across mount, unmount and remount', () => {
      const first = mount(DcpChart, { props });
      const firstService = vi.mocked(ChartService.prototype.mount).mock.contexts[0];
      first.unmount();

      expect(ChartService.prototype.destroy).toHaveBeenCalledTimes(1);
      expect(vi.mocked(ChartService.prototype.destroy).mock.contexts[0]).toBe(firstService);

      const second = mount(DcpChart, { props });
      const secondService = vi.mocked(ChartService.prototype.mount).mock.contexts[1];
      expect(secondService).not.toBe(firstService);
      expect(ChartService.prototype.mount).toHaveBeenCalledTimes(2);
      expect(ChartService.prototype.setConfig).toHaveBeenLastCalledWith(expect.objectContaining({
        data: [expect.objectContaining(props.data[0])]
      }));

      second.unmount();
      expect(ChartService.prototype.destroy).toHaveBeenCalledTimes(2);
      expect(vi.mocked(ChartService.prototype.destroy).mock.contexts).toEqual([
        firstService, secondService
      ]);
    });

    it.each([
      { width: 0, height: 400 },
      { width: 600, height: 0 },
      { width: -1, height: 400 },
      { width: 600, height: -1 },
      { width: NaN, height: 400 },
      { width: 600, height: Infinity }
    ])('does not mount with invalid dimensions %j and still destroys the service', (layout) => {
      const wrapper = mount(DcpChart, { props: { ...props, layout } });
      expect(wrapper.findComponent(ChartPlaceholder).exists()).toBe(true);
      expect(ChartService.prototype.mount).not.toHaveBeenCalled();
      expect(ChartService.prototype.setConfig).not.toHaveBeenCalled();
      wrapper.unmount();
      expect(ChartService.prototype.destroy).toHaveBeenCalledTimes(1);
    });

    it('mounts once with the latest valid dimensions without waiting for the debounce', async () => {
      const wrapper = mount(DcpChart, {
        props: { ...props, layout: { width: 0, height: 0 } }
      });
      await wrapper.setProps({ layout: { width: 720, height: 0 } });
      await nextTick();
      expect(ChartService.prototype.mount).not.toHaveBeenCalled();

      await wrapper.setProps({ layout: { width: 720, height: 480 } });
      await nextTick();
      expect(ChartService.prototype.setConfig).toHaveBeenCalledExactlyOnceWith(
        expect.objectContaining({ layout: expect.objectContaining({ width: 720, height: 480 }) })
      );
      expect(ChartService.prototype.mount).toHaveBeenCalledExactlyOnceWith(wrapper.find('div').element);
      expect(wrapper.findComponent(ChartPlaceholder).exists()).toBe(false);

      vi.advanceTimersByTime(300);
      expect(ChartService.prototype.setConfig).toHaveBeenCalledTimes(1);
    });

    it('cancels a pending resize on unmount and does not update or mount afterwards', async () => {
      const wrapper = mount(DcpChart, { props });
      await wrapper.setProps({ layout: { width: 800, height: 500 } });
      expect(vi.getTimerCount()).toBe(1);
      wrapper.unmount();
      expect(vi.getTimerCount()).toBe(0);

      vi.runAllTimers();
      await nextTick();
      expect(ChartService.prototype.setConfig).toHaveBeenCalledTimes(1);
      expect(ChartService.prototype.mount).toHaveBeenCalledTimes(1);
      expect(ChartService.prototype.destroy).toHaveBeenCalledTimes(1);
    });

    it('does not mount from a pending nextTick continuation after unmount', async () => {
      const wrapper = mount(DcpChart, {
        props: { ...props, layout: { width: 0, height: 0 } }
      });
      const ready = wrapper.setProps({ layout: { width: 800, height: 500 } });
      await nextTick();
      expect(ChartService.prototype.mount).not.toHaveBeenCalled();
      expect(vi.getTimerCount()).toBe(1);
      wrapper.unmount();
      await ready;
      await nextTick();
      vi.runAllTimers();

      expect(ChartService.prototype.mount).not.toHaveBeenCalled();
      expect(ChartService.prototype.setConfig).not.toHaveBeenCalled();
      expect(ChartService.prototype.destroy).toHaveBeenCalledTimes(1);
    });

    it('does not mount if dimensions become invalid while nextTick is pending', async () => {
      const layout = reactive({ width: 0, height: 0 });
      const wrapper = mount(DcpChart, {
        props: { ...props, layout }
      });
      layout.width = 800;
      layout.height = 500;
      await nextTick();
      expect(ChartService.prototype.mount).not.toHaveBeenCalled();
      layout.width = 0;
      layout.height = 0;
      await nextTick();
      vi.runAllTimers();

      expect(ChartService.prototype.mount).not.toHaveBeenCalled();
      expect(ChartService.prototype.setConfig).not.toHaveBeenCalled();
    });

    it('uses explicit initial dimensions and coalesces later resizes without remounting', async () => {
      const wrapper = mount(DcpChart, { props });
      expect(ChartService.prototype.setConfig).toHaveBeenCalledExactlyOnceWith(
        expect.objectContaining({ layout: expect.objectContaining(props.layout) })
      );
      await wrapper.setProps({ layout: { width: 700, height: 450 } });
      vi.advanceTimersByTime(150);
      await wrapper.setProps({ layout: { width: 800, height: 500 } });
      vi.advanceTimersByTime(299);
      expect(ChartService.prototype.setConfig).toHaveBeenCalledTimes(1);
      vi.advanceTimersByTime(1);
      expect(ChartService.prototype.setConfig).toHaveBeenCalledTimes(2);
      expect(ChartService.prototype.setConfig).toHaveBeenLastCalledWith(expect.objectContaining({
        layout: expect.objectContaining({ width: 800, height: 500 })
      }));

      await wrapper.setProps({ data: [{ x: [5], y: [6] }] });
      expect(ChartService.prototype.setConfig).toHaveBeenCalledTimes(3);
      expect(ChartService.prototype.setConfig).toHaveBeenLastCalledWith(expect.objectContaining({
        data: [expect.objectContaining({ x: [5], y: [6] })]
      }));
      expect(ChartService.prototype.mount).toHaveBeenCalledTimes(1);
    });

    it('keeps the mounted container through temporary invalid dimensions', async () => {
      const wrapper = mount(DcpChart, { props });
      const container = wrapper.find('div').element;
      await wrapper.setProps({ layout: { width: 0, height: 0 } });
      await wrapper.setProps({ data: [{ x: [5], y: [6] }] });
      vi.advanceTimersByTime(300);
      expect(ChartService.prototype.setConfig).toHaveBeenCalledTimes(1);
      expect(wrapper.find('div').element).toBe(container);

      await wrapper.setProps({ layout: { width: 900, height: 550 } });
      await nextTick();
      expect(wrapper.find('div').element).toBe(container);
      expect(ChartService.prototype.mount).toHaveBeenCalledTimes(1);
      expect(ChartService.prototype.setConfig).toHaveBeenLastCalledWith(expect.objectContaining({
        layout: expect.objectContaining({ width: 900, height: 550 }),
        data: [expect.objectContaining({ x: [5], y: [6] })]
      }));
    });

    it('preserves config and interaction updates made before initial readiness', async () => {
      const setInteractionMode = vi.spyOn(ChartService.prototype, 'setInteractionMode');
      const setSelectMode = vi.spyOn(ChartService.prototype, 'setSelectMode');
      const deselect = vi.spyOn(ChartService.prototype, 'deselect');
      const onAction = vi.fn();
      const wrapper = mount(DcpChart, {
        props: { ...props, layout: { width: 0, height: 0 } }
      });
      const updates = {
        data: [{ x: [5], y: [6] }],
        axes: [{ id: 'y', position: 'left', type: 'log' }],
        shapes: [{ type: 'line', x0: 0, y0: 0, x1: 1, y1: 1 }],
        annotations: [{ text: 'Peak', x: 5, y: 6 }],
        events: { action: onAction },
        interactionMode: InteractionMode.Zoom,
        selectMode: SelectMode.Lasso,
        showLegend: false,
        options: { scrollZoom: true }
      } satisfies Partial<InstanceType<typeof DcpChart>['$props']>;
      await wrapper.setProps(updates);
      wrapper.vm.deselect();
      expect(setInteractionMode).not.toHaveBeenCalled();
      expect(setSelectMode).not.toHaveBeenCalled();
      expect(deselect).not.toHaveBeenCalled();
      expect(ChartService.prototype.setConfig).not.toHaveBeenCalled();

      await wrapper.setProps({ layout: { width: 750, height: 450 } });
      await nextTick();
      expect(ChartService.prototype.setConfig).toHaveBeenLastCalledWith(expect.objectContaining({
        data: [expect.objectContaining(updates.data[0])],
        axes: updates.axes,
        shapes: updates.shapes,
        annotations: updates.annotations,
        events: updates.events,
        options: expect.objectContaining(updates.options),
        layout: expect.objectContaining({
          width: 750, height: 450, style: { showLegend: false },
          interactionMode: InteractionMode.Zoom, selectMode: SelectMode.Lasso
        })
      }));

      await wrapper.setProps({ interactionMode: InteractionMode.Pan, selectMode: SelectMode.Box });
      expect(setInteractionMode).toHaveBeenCalledExactlyOnceWith(InteractionMode.Pan);
      expect(setSelectMode).toHaveBeenCalledExactlyOnceWith(SelectMode.Box);
      const onNextAction = vi.fn();
      const nextUpdates = {
        ...updates,
        data: [{ x: [7], y: [8] }],
        axes: [{ id: 'y', position: 'left', type: 'linear' }],
        shapes: [{ type: 'line', x0: 1, y0: 1, x1: 2, y1: 2 }],
        annotations: [{ text: 'Updated peak', x: 7, y: 8 }],
        events: { action: onNextAction },
        interactionMode: InteractionMode.Pan,
        selectMode: SelectMode.Box,
        layout: { width: 900, height: 600 }
      } satisfies Partial<InstanceType<typeof DcpChart>['$props']>;
      await wrapper.setProps(nextUpdates);
      vi.advanceTimersByTime(300);
      expect(ChartService.prototype.setConfig).toHaveBeenLastCalledWith(expect.objectContaining({
        data: [expect.objectContaining(nextUpdates.data[0])],
        axes: nextUpdates.axes,
        shapes: nextUpdates.shapes,
        annotations: nextUpdates.annotations,
        events: nextUpdates.events,
        options: expect.objectContaining(updates.options),
        layout: expect.objectContaining({
          width: 900, height: 600, style: { showLegend: false },
          interactionMode: InteractionMode.Pan, selectMode: SelectMode.Box
        })
      }));
      expect(ChartService.prototype.mount).toHaveBeenCalledTimes(1);
      wrapper.vm.deselect();
      expect(deselect).toHaveBeenCalledTimes(1);
      const exposedDeselect = wrapper.vm.deselect;
      wrapper.unmount();
      exposedDeselect();
      expect(deselect).toHaveBeenCalledTimes(1);
    });
  });

  it('should render chart container when layout has width and height', async () => {
    const wrapper = mount(DcpChart, {
      props: {
        data: [
          { x: [1, 2, 3], y: [4, 5, 6], type: 'scatter' }
        ],
        layout: {
          width: 500,
          height: 500
        }
      }
    });

    await wrapper.vm.$nextTick();
    
    expect(wrapper.find('div').exists()).toBe(true);
  });

  it('should accept ViewChange and Action event handlers via events prop', () => {
    const onViewChange = vi.fn();
    const onAction = vi.fn();

    const wrapper = mount(DcpChart, {
      props: {
        data: [],
        layout: { width: 500, height: 500 },
        events: {
          [DcpChartEventType.ViewChange]: onViewChange,
          [DcpChartEventType.Action]: onAction,
        } as any,
      },
    });

    expect(wrapper.find('div').exists()).toBe(true);
    expect(onViewChange).not.toHaveBeenCalled();
    expect(onAction).not.toHaveBeenCalled();
  });

  it('should expose a programmatic deselect method', () => {
    const wrapper = mount(DcpChart, {
      props: {
        data: [],
        layout: {
          width: 500,
          height: 500
        }
      }
    });

    expect(typeof (wrapper.vm as any).deselect).toBe('function');
  });

  it('should pass annotations to chart configuration', () => {
    const setConfigSpy = vi.spyOn(ChartService.prototype, 'setConfig');

    mount(DcpChart, {
      props: {
        data: [],
        layout: {
          width: 500,
          height: 500
        },
        annotations: [
          {
            text: 'Peak',
            x: 2,
            y: 6,
            showArrow: true
          }
        ]
      }
    });

    expect(setConfigSpy).toHaveBeenCalledWith(expect.objectContaining({
      annotations: [
        expect.objectContaining({
          text: 'Peak',
          x: 2,
          y: 6,
          showArrow: true
        })
      ]
    }));

    setConfigSpy.mockRestore();
  });

  it('should forward mode bar options into chart service config', () => {
    const setConfigSpy = vi.spyOn(ChartService.prototype, 'setConfig');

    mount(DcpChart, {
      props: {
        data: [],
        layout: {
          width: 500,
          height: 500
        },
        showModeBar: true,
        modeBarOptions: {
          scrollZoom: true,
          displaylogo: false,
          modeBarButtonsToRemove: ['zoom2d']
        }
      }
    });

    expect(setConfigSpy).toHaveBeenCalledWith(expect.objectContaining({
      options: expect.objectContaining({
        displayModeBar: true,
        scrollZoom: true,
        displaylogo: false,
        modeBarButtonsToRemove: ['zoom2d']
      })
    }));

    setConfigSpy.mockRestore();
  });

  it('should update chart service config options when modeBarOptions changes', async () => {
    const setConfigSpy = vi.spyOn(ChartService.prototype, 'setConfig');

    const wrapper = mount(DcpChart, {
      props: {
        data: [],
        layout: {
          width: 500,
          height: 500
        },
        showModeBar: 'hover',
        modeBarOptions: {
          scrollZoom: false
        }
      }
    });

    await wrapper.setProps({
      modeBarOptions: {
        scrollZoom: true,
        modeBarButtonsToAdd: ['drawline']
      }
    });

    expect(setConfigSpy).toHaveBeenLastCalledWith(expect.objectContaining({
      options: expect.objectContaining({
        displayModeBar: 'hover',
        scrollZoom: true,
        modeBarButtonsToAdd: ['drawline']
      })
    }));

    setConfigSpy.mockRestore();
  });

  it('should forward generic chart options into chart service config', () => {
    const setConfigSpy = vi.spyOn(ChartService.prototype, 'setConfig');

    mount(DcpChart, {
      props: {
        data: [],
        layout: {
          width: 500,
          height: 500
        },
        options: {
          doubleClick: false
        }
      }
    });

    expect(setConfigSpy).toHaveBeenCalledWith(expect.objectContaining({
      options: expect.objectContaining({
        doubleClick: false
      })
    }));

    setConfigSpy.mockRestore();
  });

  it('should forward showLegend into chart service layout', () => {
    const setConfigSpy = vi.spyOn(ChartService.prototype, 'setConfig');

    mount(DcpChart, {
      props: {
        data: [],
        layout: {
          width: 500,
          height: 500
        },
        showLegend: false
      }
    });

    expect(setConfigSpy).toHaveBeenCalledWith(expect.objectContaining({
      layout: expect.objectContaining({
        style: expect.objectContaining({
          showLegend: false
        })
      })
    }));

    setConfigSpy.mockRestore();
  });

  it('should update chart service layout when showLegend changes', async () => {
    const setConfigSpy = vi.spyOn(ChartService.prototype, 'setConfig');

    const wrapper = mount(DcpChart, {
      props: {
        data: [],
        layout: {
          width: 500,
          height: 500
        },
        showLegend: true
      }
    });

    await wrapper.setProps({
      showLegend: false
    });

    expect(setConfigSpy).toHaveBeenLastCalledWith(expect.objectContaining({
      layout: expect.objectContaining({
        style: expect.objectContaining({
          showLegend: false
        })
      })
    }));

    setConfigSpy.mockRestore();
  });

  it('should prioritize generic options over modeBarOptions for same keys', () => {
    const setConfigSpy = vi.spyOn(ChartService.prototype, 'setConfig');

    mount(DcpChart, {
      props: {
        data: [],
        layout: {
          width: 500,
          height: 500
        },
        modeBarOptions: {
          scrollZoom: false
        },
        options: {
          scrollZoom: true
        }
      }
    });

    expect(setConfigSpy).toHaveBeenCalledWith(expect.objectContaining({
      options: expect.objectContaining({
        scrollZoom: true
      })
    }));

    setConfigSpy.mockRestore();
  });

  it('should update chart configuration when shapes change', async () => {
    const setConfigSpy = vi.spyOn(ChartService.prototype, 'setConfig');

    const wrapper = mount(DcpChart, {
      props: {
        data: [],
        layout: {
          width: 500,
          height: 500
        },
        shapes: []
      }
    });

    await wrapper.setProps({
      shapes: [
        {
          type: 'line',
          x0: 0,
          y0: 0,
          x1: 1,
          y1: 1
        }
      ]
    });

    expect(setConfigSpy).toHaveBeenCalledWith(expect.objectContaining({
      shapes: [
        expect.objectContaining({
          type: 'line',
          x0: 0,
          y0: 0,
          x1: 1,
          y1: 1
        })
      ]
    }));

    setConfigSpy.mockRestore();
  });

  it('should forward y-axis scale type and update it reactively', async () => {
    const setConfigSpy = vi.spyOn(ChartService.prototype, 'setConfig');
    const axes: DcpAxisConfig[] = [
      { id: 'y', position: 'left', type: 'log', range: [1, 1000] }
    ];

    const wrapper = mount(DcpChart, {
      props: {
        data: [{ x: [1, 2, 3], y: [1, 10, 100] }],
        layout: { width: 500, height: 500 },
        axes
      }
    });

    expect(setConfigSpy).toHaveBeenLastCalledWith(expect.objectContaining({
      axes: [expect.objectContaining({ id: 'y', type: 'log', range: [1, 1000] })]
    }));

    await wrapper.setProps({
      axes: [{ ...axes[0], type: 'linear' }]
    });

    expect(setConfigSpy).toHaveBeenLastCalledWith(expect.objectContaining({
      axes: [expect.objectContaining({ id: 'y', type: 'linear' })]
    }));

    setConfigSpy.mockRestore();
  });

  it('should delegate deselection to the chart service', () => {
    const deselectSpy = vi.spyOn(ChartService.prototype, 'deselect');

    const wrapper = mount(DcpChart, {
      props: {
        data: [],
        layout: {
          width: 500,
          height: 500
        }
      }
    });

    (wrapper.vm as any).deselect();

    expect(deselectSpy).toHaveBeenCalledTimes(1);

    deselectSpy.mockRestore();
  });
});