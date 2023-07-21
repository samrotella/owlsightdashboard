<template class="">
    <Menubar>
        <template #start>
            <img alt="logo" src="../assets/Owlsight.png" height="75" class="mr-2" />
        </template>
        <template #end>
            <Button v-on:click="x()" severity="secondary" label="Signout" text />
        </template>
    </Menubar>
    <!-- Date Range -->
    <template class="grid pt-3">
        <div class="col-offset-9 card flex">
            <Calendar v-model="dates" selectionMode="range" :manualInput="false" />
        </div>
    </template>
    <!-- eslint-disable-next-line -->
    <template class="grid pt-3">
        <!-- Total Unique Visits Chart -->
        <Card class="col-4 col-offset-1">
            <template #title> Total Unique Visits </template>
            <!-- eslint-disable-next-line -->
            <template #subtitle> 300,000 <h5 style="color: rgb(18, 173, 10);">+3.2%</h5> </template>
            <template #content>
                <div class="card">
                    <Chart type="line" :data="chartData" :options="chartOptions" class="h-20rem" />
                </div>
            </template>
        </Card>
        <!-- eslint-disable-next-line -->
        <Card class="col-4 col-offset-2">
            <template #title> Page Visits </template>
            <template #content>
                <div class="card flex justify-content-center">
                    <Chart type="pie" :data="chartData" :options="chartOptions" class="w-full md:w-30rem" />
                </div>
            </template>
        </Card>
    </template>

    <!-- eslint-disable-next-line -->
    <template class="grid pt-4">
            <!-- eslint-disable-next-line -->
        <Card class="col-4 col-offset-1">
            <template #title> Sources </template>
            <template #content>
                <div class="card flex justify-content-center">
                    <Chart type="pie" :data="chartData" :options="chartOptions" class="w-full md:w-30rem" />
                </div>
            </template>
        </Card>

        <!-- eslint-disable-next-line -->
        <Card class="col-4 col-offset-2">
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
            dates: null
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