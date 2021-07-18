<script>
import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;
export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ["chartData"],
  mounted() {
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
    };
    this.renderChart(this.chartData, options);
  },
};
</script>