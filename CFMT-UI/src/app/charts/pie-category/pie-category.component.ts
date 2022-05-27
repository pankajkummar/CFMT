import { Component, OnInit } from '@angular/core';
import { EChartsOption, ECharts , EChartsCoreOption} from 'echarts';
import { HttpClient } from '@angular/common/http';
import { NgxEchartsDirective } from 'ngx-echarts';
import { json2csv } from 'json-2-csv';

@Component({
  selector: 'app-pie-category',
  templateUrl: './pie-category.component.html',
  styleUrls: ['./pie-category.component.css']
})
export class PieCategoryComponent implements OnInit {
  piedata: any;
  categorychartvalue: any[];
  chartOption: any;
  statePieData: any;
  stateChartValue: any[];
  StateChartOption: any;
  barDateData: any;
  barXValue: any[];
  barYValue: any[];
  barOption: any;
  constructor(
    private http: HttpClient,
  ) { }


  ngOnInit(): void {

    
   this.getPieCategory();
   this.getPieState();
   this.getBarDate()
    
  }

  initCategoryChart(){

  this.chartOption = {
    title: {
      text: 'Total Funding Category Wise',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '60%',
        data: this.categorychartvalue,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
}
initStateChart(){

  this.StateChartOption = {
    title: {
      text: 'Total Funding State Wise',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '60%',
        data: this.stateChartValue,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
}
initBarChart(){
  this.barOption = {
    title: {
      text: 'Total Funding Date Wise',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: this.barXValue,
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Direct',
        type: 'bar',
        barWidth: '60%',
        data: this.barYValue
      }
    ]
  };
}
  getPieCategory() {
    const url = 'http://localhost:4000/api/category-pie';
    this.http.get(url)
      .subscribe((result) => {
       this.piedata = result
       this.categorychartvalue = []
       Object.keys(this.piedata).forEach((name:any,index)=> {
         const Ob = {"name":"","value":0}
         Ob["name"]=name
         Ob["value"]=this.piedata[name]["funding"]
         this.categorychartvalue.push(Ob);
       })
      
       this.initCategoryChart();
      
       
       console.log("piedata",this.piedata)
      });
     
  }
  getPieState() {
    const url = 'http://localhost:4000/api/state-pie';
    this.http.get(url)
      .subscribe((result) => {
       this.statePieData = result
       this.stateChartValue = []
       Object.keys(this.statePieData).forEach((name:any,index)=> {
         const Ob = {"name":"","value":0}
         Ob["name"]=name
         Ob["value"]=this.statePieData[name]["funding"]
         this.stateChartValue.push(Ob);
       })
      
       this.initStateChart();
      });
     
  }

  getBarDate() {
    const url = 'http://localhost:4000/api/date-bar';
    this.http.get(url)
      .subscribe((result) => {
       this.barDateData = result
       this.barXValue = []
       this.barYValue = []
       Object.keys(this.barDateData).forEach((name:any,index)=> {
         this.barXValue.push(name);
         this.barYValue.push(this.barDateData[name]["funding"])
       })
      
       this.initBarChart();
      });
     
  }


}
