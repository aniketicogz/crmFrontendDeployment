import PropTypes from "prop-types";

import * as am5 from "@amcharts/amcharts5";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5percent from "@amcharts/amcharts5/percent";
import { useLayoutEffect } from "react";
import Wrapper from "@components/helpers/wrapper";
import "./chart.scss";

am5.addLicense("AM5C258896422");

const FunnelChart = ({ chartId, chartData }) => {
  useLayoutEffect(() => {
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new(chartId);

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/
    var chart = root.container.children.push(
      am5percent.SlicedChart.new(root, {
        layout: root.verticalLayout,
      })
    );

    // Create series
    // https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/#Series
    var series = chart.series.push(
      am5percent.FunnelSeries.new(root, {
        alignLabels: false,
        orientation: "horizontal",
        valueField: "value",
        categoryField: "label",
        bottomRatio: 1,
      })
    );

    series.slices.template.setAll({
      strokeWidth: 4,
    });

    series.links.template.setAll({
      height: 30,
    });

    series.get("colors").set("colors", [am5.color(0x11a1fd), am5.color(0x5a75f9), am5.color(0x07c180), am5.color(0xff9931), am5.color(0x7d9eb5), am5.color(0x085db6), am5.color(0x3247b5), am5.color(0x038673), am5.color(0xb45917), am5.color(0x486f88), am5.color(0x0c7dd9), am5.color(0x4259d4), am5.color(0x06a57d), am5.color(0xdb7823), am5.color(0xa7c1d2), am5.color(0x4cc3fd), am5.color(0x8298fb), am5.color(0x3cd795), am5.color(0xffb866), am5.color(0xcedfe8)]);

    // Disabling labels
    series.labels.template.set("forceHidden", true);

    series.labels.template.setAll({
      fontSize: 12,
      fontWeight: "400",
      fill: "#213345",
      text: "{category}",
    });

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
      oversizedBehavior: "truncate",
      cornerRadius: 5,
    });

    tooltip.label.setAll({
      fill: am5.color(0xffffff),
      fontSize: 13,
    });

    series.slices.template.set("tooltipText", "{category}: [bold]{valuePercentTotal.formatNumber('0.00')}%[/] ({value})");
    // series.slices.template.set("tooltipText", "[bold]{category}:[/] {formattedValue}");

    // Set data
    // https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/#Setting_data
    series.data.setAll(chartData);

    // Play initial series animation
    // https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
    series.appear();

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

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100);

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

export default FunnelChart;
