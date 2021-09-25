<template>
  <canvas id="planet-chart1"></canvas>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { Chart, registerables } from "chart.js";
import { useStatisticStore } from "../../services";

Chart.register(...registerables);
export default defineComponent({
  name: "PieCart",
  setup() {
    const statisticStore = useStatisticStore();

    const createChart = () => {
      const canvas = document.getElementById(
        "planet-chart1"
      ) as HTMLCanvasElement;
      new Chart(canvas, {
        type: "doughnut",
        data: {
          labels: ["Performance", "Year to Date"],
          datasets: [
            {
              label: "My First Dataset",
              data: [statisticStore.getTotalStat, 
                (100 - statisticStore.getTotalStat)],
              backgroundColor: ["#b37feb", "#ede1f8"],
              borderWidth: 0,
              hoverOffset: 6,
            },
          ],
        },
      });
    };
    onMounted(() => createChart());

    return {};
  },
});
</script>