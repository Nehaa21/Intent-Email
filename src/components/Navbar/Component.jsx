import React from "react";
const cmpstr =
  "import React from 'react'; import Highcharts from 'highcharts'; import HighchartsReact from 'highcharts-react-official'; const PieChart = () => { const data = [ { name: 'user5', completion_status: 'in_progress', course_status: 'active' }, { name: 'user7', completion_status: 'in_progress', course_status: 'active' }, { name: 'user8', completion_status: 'in_progress', course_status: 'active' }, { name: 'user9', completion_status: 'in_progress', course_status: 'active' }, { name: 'user44', completion_status: 'in_progress', course_status: 'active' }, { name: 'Highspot', completion_status: 'in_progress', course_status: 'active' }, ]; const completionStatusData = data.reduce((acc, curr) => { if (curr.completion_status in acc) { acc[curr.completion_status]++; } else { acc[curr.completion_status] = 1; } return acc; }, {}); const options = { chart: { type: 'pie', }, title: { text: 'Completion Status', }, series: [ { name: 'Completion Status', data: Object.entries(completionStatusData).map(([name, y]) => ({ name, y })), }, ], }; return ; }; export default PieChart;";

const Component = () => {
  // eslint-disable-next-line no-eval
  const Component = eval(cmpstr);
  return <Component />;
};

export default Component;