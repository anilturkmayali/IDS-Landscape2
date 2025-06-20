import { prettifyNumber } from 'common';
import isUndefined from 'lodash/isUndefined';
import { SolidApexCharts } from 'solid-apexcharts';
import { createSignal, onMount, Show } from 'solid-js';

import styles from './VerticalBarChart.module.css';

interface Props {
  name: string;
  shortName?: string;
  tooltipTitle?: string;
  data?: { [key: string]: number };
  dataType?: string;
}

const VerticalBarChart = (props: Props) => {
  const [sortedKeys, setSortedKeys] = createSignal<string[]>([]);
  const [series, setSeries] = createSignal<number[]>([]);
  const [maxValue, setMaxValue] = createSignal<number>();

  onMount(() => {
    if (props.data) {
      const keys = Object.keys(props.data).sort();
      setMaxValue(props.data[keys[0]]);
      setSortedKeys(keys);
      const values: number[] = [];
      keys.forEach((k: string) => {
        if (props.data && props.data[k]) {
          values.push(props.data[k]);
        }
      });
      setSeries(values);
    }
  });

  const getBarChartConfig = (): ApexCharts.ApexOptions => {
    return {
      chart: {
        fontFamily: "'Lato', Roboto, 'Helvetica Neue', Arial, sans-serif !default",
        height: 350,
        type: 'bar',
        redrawOnWindowResize: true,
        redrawOnParentResize: true,
        toolbar: {
          autoSelected: 'zoom',
          tools: {
            download: false,
            pan: false,
          },
        },
      },
      title: {
        text: props.name,
        style: {
          color: 'var(--bs-gray-600)',
          fontWeight: '600',
        },
      },
      grid: { borderColor: 'var(--bs-gray-200)' },
      plotOptions: {
        bar: {
          borderRadius: 0,
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ['var(--color-stats-1)'],
      xaxis: {
        categories: sortedKeys(),
        labels: {
          style: {
            colors: 'var(--color-font)',
            fontSize: '11px',
          },
        },
      },
      yaxis: {
        forceNiceScale: true,
        min: 0,
        labels: {
          formatter: (value: number): string => {
            if (!isUndefined(props.dataType) && props.dataType === 'money') {
              return `$${prettifyNumber(value)}`;
            } else {
              return value.toFixed(0);
            }
          },
        },
      },
      tooltip: {
        y: {
          title: {
            formatter: (): string => {
              return '';
            },
          },
          formatter: (val: number): string => {
            if (!isUndefined(props.dataType) && props.dataType === 'money') {
              return `$${prettifyNumber(val)}`;
            } else {
              return `${val}`;
            }
          },
        },
      },
      responsive: [
        {
          breakpoint: 992,
          options: {
            title: {
              text: props.shortName || props.name,
            },
            xaxis: {
              tickAmount: 3,
              max: maxValue(),
            },
          },
        },
      ],
    };
  };

  return (
    <Show when={series().length > 0}>
      <div class="card rounded-0">
        <div class={`card-body ${styles.chart}`} aria-hidden={true}>
          <SolidApexCharts
            options={getBarChartConfig()}
            series={[{ name: props.name, data: series() }]}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </Show>
  );
};

export default VerticalBarChart;
