import React from 'react';
import { useQuery } from 'react-query';
import { useOutletContext, useParams } from 'react-router-dom';
import { fetchCoinHistory } from '../api';
import ApexCharts from 'react-apexcharts';
import { AxiosError } from 'axios';

interface ChartProps {
    coinId : string;
}

interface IHistorical {
    time_open: number;
    time_close: number;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    market_cap: number;
  }
const Chart = () => {
    const {coinId} = useOutletContext<ChartProps>();
    const { isLoading, data } = useQuery<IHistorical[]>(
        ["ohlcv", coinId],
        () => fetchCoinHistory(coinId),
        {
          refetchInterval: 50000,
        }
      );
    return (
      <div>
            {isLoading ? "Loading..." : <ApexCharts type='line'
            series={[
                {
                    name : "price",
                    data: data?.map((price) => Number(price.close)) as number[],
                }
            ]}
            options={{
                theme : {
                    mode : "dark"
                },
                chart: {
                height : 300,
                width: 500,
                toolbar : {
                    show: false,
                },
                background : "transparent"
            },
            grid: {show:false},
            stroke : {
                curve : "smooth",
                width : 5,

            },
            yaxis : {
                show:false,
            },
            xaxis : {
                labels : {show : false},
                axisTicks : {show : false},
                axisBorder : {show : false},
                type : "datetime",
               categories: data?.map((price) =>
                    new Date(price.time_close * 1000).toISOString()
                    ),
            },
            fill : {type :"gradient", gradient:{gradientToColors:["#0be881"], stops : [0,100]},
            },
            colors:["#0fbcf9"],
            tooltip : {
                y : {
                    formatter : (value) => `$${value.toFixed(0)}`
                }
            }
            }}/>}
      </div>
    );
};

export default Chart;