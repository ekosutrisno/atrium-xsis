<template>
  <canvas id="planet-chart"></canvas>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables);
export default defineComponent({
  name: "PieCart",
  setup() {
    const createChart = () => {
      const canvas = document.getElementById(
        "planet-chart"
      ) as HTMLCanvasElement;
      new Chart(canvas, {
        type: "doughnut",
        data: {
          labels: ["Performance", "Year to Date"],
          datasets: [
            {
              label: "My First Dataset",
              data: [49.329, (100 - 49.329)],
              backgroundColor: [
                "#b37feb",
                "#ede1f8",
              ],
              borderWidth: 0,
              hoverOffset: 6
            },
          ],
        },
      });
    };
    onMounted(()=> createChart())

    return {};
  },
});
</script>