import PropTypes from "prop-types";

import * as am5 from "@amcharts/amcharts5";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5percent from "@amcharts/amcharts5/percent";
import { useLayoutEffect } from "react";
import Wrapper from "@components/helpers/wrapper";
import "./chart.scss";

am5.addLicense("AM5C258896422");

const DonutChart = ({ chartId, chartData }) => {
  useLayoutEffect(() => {
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new(chartId);

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
    var chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
        innerRadius: am5.percent(50),
      })
    );

    // Create series
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
    var series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "label",
        alignLabels: false,
      })
    );

    series.states.create("hidden", {
      startAngle: 180,
      endAngle: 180,
    });

    series.ticks.template.setAll({
      forceHidden: true,
    });
    series.labels.template.set("forceHidden", true);

    // Disabling labels and ticks
    series.labels.template.set("visible", false);
    series.ticks.template.set("visible", false);

    // UPDATE COLORS
    // series.get("colors").set("colors", colorSet);
    series.get("colors").set("colors", [am5.color(0x11a1fd), am5.color(0x5a75f9), am5.color(0x07c180), am5.color(0xff9931), am5.color(0x7d9eb5), am5.color(0x085db6), am5.color(0x3247b5), am5.color(0x038673), am5.color(0xb45917), am5.color(0x486f88), am5.color(0x0c7dd9), am5.color(0x4259d4), am5.color(0x06a57d), am5.color(0xdb7823), am5.color(0xa7c1d2), am5.color(0x4cc3fd), am5.color(0x8298fb), am5.color(0x3cd795), am5.color(0xffb866), am5.color(0xcedfe8)]);

    // Set data
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
    series.data.setAll(chartData);

    var tooltip = series.set(
      "tooltip",
      am5.Tooltip.new(root, {
        getFillFromSprite: false,
        getStrokeFromSprite: false,
        autoTextColor: false,
        pointerOrientation: "horizontal",
        position: "pointer",
      })
    );

    tooltip.get("background").setAll({
      fill: am5.color(0x213345),
      // maxWidth: 200,
      oversizedBehavior: "truncate",
      cornerRadius: 5,
    });

    series.slices.template.set("tooltipText", "{category}: [bold]{valuePercentTotal.formatNumber('0.00')}%[/]");

    tooltip.label.setAll({
      fill: am5.color(0xffffff),
      fontSize: 13,
    });

    // Create legend
    // https://www.amcharts.com/docs/v5/charts/percent-charts/legend-percent-series/
    var legend = chart.children.push(
      am5.Legend.new(root, {
        position: "relative", // options: "absolute" / "relative"
        centerX: am5.percent(50),
        x: am5.percent(50),
        height: chartData.length >= 6 ? am5.percent(30) : null,
        marginTop: 15,
        // marginBottom: 15,
        layout: root.gridLayout, // options: root.horizontalLayout / root.gridLayout / root.verticalLayout
        layout: am5.GridLayout.new(root, {
          maxColumns: 10,
          fixedWidthGrid: true,
        }),
        verticalScrollbar: am5.Scrollbar.new(root, {
          orientation: "vertical",
        }),
      })
    );

    legend.markers.template.setAll({
      width: 13,
      height: 13,
    });

    legend.markerRectangles.template.setAll({
      cornerRadiusTL: 10,
      cornerRadiusTR: 10,
      cornerRadiusBL: 10,
      cornerRadiusBR: 10,
    });

    legend.labels.template.setAll({
      fontSize: 12,
      fontWeight: "400",
      fill: "#213345",
    });

    legend.labels.template.setAll({
      oversizedBehavior: "wrap",
    });

    // TO HIDE LABEL VALUES FROM LEGEND
    legend.valueLabels.template.set("forceHidden", true);

    legend.data.setAll(series.dataItems);

    // Play initial series animation
    // https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
    series.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [chartData]);

  return (
    <Wrapper>
      <div id={chartId} className="chartWrapper"></div>
    </Wrapper>
  );
};

export default DonutChart;
