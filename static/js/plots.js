// replace the url later
url = "static/data/clinical_raw.json"
d3.json("/api/clinical_raw").then((data) => {
    var config = {responsive: true};
    //histograms
    var overall_survival_months = data.map(d => d["overall_survival_months"]);
    var death_from_cancer = data.filter(d => d["death_from_cancer"] != "").map(d => d["death_from_cancer"]);
    var trace1 = {
        x: overall_survival_months,
        type: 'histogram',
        opacity: 0.6,
        marker: {
            color: 'red',
        },
      };
      var layout1 = {
              title: "Overall Survival Months Distribution",
              xaxis: { title: "Overall Survival Months" },
              yaxis: { title: "Count" },
            };
    var data1 = [trace1];
    var trace2 = {
        x: death_from_cancer,
        type: 'histogram',
        opacity: 0.6,
        marker: {
            color: ["47CACC","FFBE88","CDB3D4"],
        },
      };
      var layout2 = {
              title: "Overall Survival Outcome Distribution",
              xaxis: { title: "Overall Survival Types" },
              yaxis: { title: "Count" },
            };
    var data2 = [trace2];
    Plotly.newPlot('histogram1', data1, layout1, config);
    Plotly.newPlot('histogram2', data2, layout2, config);


    //ER, PR and HER2 boxplot
    var ER_negative = data.filter(d => d["er_status"] == "Negative").map(d => d["er_status"]);
    var ER_positive = data.filter(d => d["er_status"] == "Positive").map(d => d["er_status"]);
    var PR_negative = data.filter(d => d["pr_status"] == "Negative").map(d => d["pr_status"]);
    var PR_positive = data.filter(d => d["pr_status"] == "Positive").map(d => d["pr_status"]);
    var HER2_negative = data.filter(d => d["her2_status"] == "Negative").map(d => d["her2_status"]);
    var HER2_positive = data.filter(d => d["her2_status"] == "Positive").map(d => d["her2_status"]);
    var ER_trace1 = {
      x: ER_negative,
      y: overall_survival_months,
      type: "violin",
        name: "negative",
        points: 'none',
        box: {
            visible: true
        },
        line: {
            color: 'black'
          },
        fillcolor: "green",
        meanline: {
            visible: true
        },
        opacity: 0.6
    };
    var ER_trace2 = {
        x: ER_positive,
        y: overall_survival_months,
        type: "violin",
        name: "positive",
        points: 'none',
        box: {
            visible: true
        },
        line: {
            color: 'black'
          },
        fillcolor: "red",
        meanline: {
            visible: true
        },
        opacity: 0.6
    };
    var ER_data = [ER_trace1,ER_trace2];
    var ER_layout= {
      title: "ER Status",
      xaxis: { title: "ER Status" },
      yaxis: { title: "Overall Survival Months" },
      showlegend:false
    };
    Plotly.newPlot("boxplot1", ER_data, ER_layout, config);

    var PR_trace1 = {
        x: PR_negative,
        y: overall_survival_months,
        type: "violin",
        name: "negative",
        points: 'none',
        box: {
            visible: true
        },
        line: {
            color: 'black'
          },
        fillcolor: "green",
        meanline: {
            visible: true
        },
        opacity: 0.6
      };
      var PR_trace2 = {
          x: PR_positive,
          y: overall_survival_months,
          type: "violin",
        name: "positive",
        points: 'none',
        box: {
            visible: true
        },
        line: {
            color: 'black'
          },
        fillcolor: "red",
        meanline: {
            visible: true
        },
        opacity: 0.6
      };
      var PR_data = [PR_trace1,PR_trace2];
      var PR_layout= {
        title: "PR Status",
        xaxis: { title: "PR Status" },
        yaxis: { title: "Overall Survival Months" },
        showlegend:false
      };
      Plotly.newPlot("boxplot2", PR_data, PR_layout, config);

      var HER2_trace1 = {
        x: HER2_negative,
        y: overall_survival_months,
        type: "violin",
        name: "negative",
        points: 'none',
        box: {
            visible: true
        },
        line: {
            color: 'black'
          },
        fillcolor: "green",
        meanline: {
            visible: true
        },
        opacity: 0.6
      };
      var HER2_trace2 = {
          x: HER2_positive,
          y: overall_survival_months,
          type: "violin",
          name: "positive",
          points: 'none',
          box: {
              visible: true
          },
          line: {
              color: 'black'
            },
          fillcolor: "red",
          meanline: {
              visible: true
          },
          opacity: 0.6
      };
      var HER2_data = [HER2_trace1,HER2_trace2];
      var HER2_layout= {
        title: "HER2 Status",
        xaxis: { title: "HER2 Status" },
        yaxis: { title: "Overall Survival Months" },
        showlegend:false
      };
      Plotly.newPlot("boxplot3", HER2_data, HER2_layout, config);
      //tumor stage
      var tumor_stage_1 = data.filter(d => d["tumor_stage"] == 1).map(d => d["tumor_stage"]);
      var tumor_stage_2 = data.filter(d => d["tumor_stage"] == 2).map(d => d["tumor_stage"]);
      var tumor_stage_3 = data.filter(d => d["tumor_stage"] == 3).map(d => d["tumor_stage"]);
      var tumor_stage_4 = data.filter(d => d["tumor_stage"] == 4).map(d => d["tumor_stage"]);
      var tumor_stage_trace1 = {
        x: tumor_stage_1,
        y: overall_survival_months,
        type: "box",
        name: "stage 1",
        boxpoints: "all",
        jitter: 0.5,
        whiskerwidth: 0.2,
        fillcolor: 'cls',
        marker: {
            size: 2
        }
      };
      var tumor_stage_trace2 = {
        x: tumor_stage_2,
        y: overall_survival_months,
        type: "box",
        name: "stage 2",
        boxpoints: "all",
        jitter: 0.5,
        whiskerwidth: 0.2,
        fillcolor: 'cls',
        marker: {
            size: 2
        }
      };
      var tumor_stage_trace3 = {
        x: tumor_stage_3,
        y: overall_survival_months,
        type: "box",
        name: "stage 3",
        boxpoints: "all",
        jitter: 0.5,
        whiskerwidth: 0.2,
        fillcolor: 'cls',
        marker: {
            size: 2
        }
      };
      var tumor_stage_trace4 = {
        x: tumor_stage_4,
        y: overall_survival_months,
        type: "box",
        name: "stage 4",
        boxpoints: "all",
        jitter: 0.5,
        whiskerwidth: 0.2,
        fillcolor: 'cls',
        marker: {
            size: 2
        }
      };
      var tumor_stage_data = [tumor_stage_trace1,tumor_stage_trace2,tumor_stage_trace3,tumor_stage_trace4];
      var tumor_stage_layout= {
        title: "Overall Surival and Tumor Stage",
        xaxis: { title: "Tumor Stage" },
        yaxis: { title: "Overall Survival Months" }
      };
      Plotly.newPlot("boxplot4", tumor_stage_data, tumor_stage_layout, config);
});