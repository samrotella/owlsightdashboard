<template class="">
    <Menubar>
        <template #start>
            <img alt="logo" src="../assets/logo.svg" height="40" class="mr-2" />
        </template>
        <template #end>
            <Button v-on:click="x()" severity="secondary" label="Signout" text />
        </template>
    </Menubar>
    <!-- eslint-disable-next-line -->
    <template class="grid">
        <Card class="col-4">
            <template #title> Browsers </template>
            <template #content>
                <div class="card flex justify-content-center">
                    <Chart type="pie" :data="chartData" :options="chartOptions" class="w-full md:w-30rem" />
                </div>
            </template>
        </Card>
    <!-- eslint-disable-next-line -->
        <Card class="col-4">
            <template #title> Browsers </template>
            <template #content>
                <div class="card flex justify-content-center">
                    <Chart type="pie" :data="chartData" :options="chartOptions" class="w-full md:w-30rem" />
                </div>
            </template>
        </Card>
    </template>
   
</template>

<script>
export default {
    name: 'Welcome',
    data () {
        return {
            chartData: null,
            chartOptions: {
                plugins: {
                    legend: {
                        labels: {
                            usePointStyle: true
                        }
                    }
                }
            },
        }
    },
    mounted() {
        this.chartData = this.setChartData();
    },
    methods: {
        getUser() {
            return 'sam';
        },
        setChartData() {
            const documentStyle = getComputedStyle(document.body);

            return {
                labels: ['Chrome', 'Safari', 'Firefox', 'Other'],
                datasets: [
                    {
                        data: [540, 325, 702, 34],
                        backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500'), documentStyle.getPropertyValue('--red-500')],
                        hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400'), documentStyle.getPropertyValue('--red-500')]
                    }
                ]
            };
        }
    },
}
</script>