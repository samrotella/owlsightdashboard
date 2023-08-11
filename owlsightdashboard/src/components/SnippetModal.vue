<!-- Show the modal if the page visit count is 0 -->
<template>
    <div class="card flex justify-content-center">
        <!-- <Button label="Show" icon="pi pi-external-link" @click="visible = true" /> -->
        <!-- eslint-disable-next-line -->
        <Dialog v-model:visible="visible" header="Insrt script tag at the bottom of your website's body tag" :style="{ width: '50vw' }">
            <!-- <Panel header="Copy the script tag and insert at the bottom of your body tag"> -->
                <h3></h3>
                    <p>
                      <code>
                        &lt;script>src="https://owlsight.onrender.com/main.js"&lt;/script>
                      </code>
                    </p>
                    <p><Button label="Copy to clipboard" class="" plain text v-on:click="copyScript()" icon="pi pi-copy" /></p>
                <!-- </Panel> -->
        </Dialog>
    </div>
</template>
<!-- <template>
    <h1>test</h1>
</template> -->

<script>
export default {
    name: "SnippetModal",
    data() {
        return {
            visible: true
        };
    },
    methods: {
        copyScript () {
            navigator.clipboard.writeText('<script>src="https://owlsight.onrender.com/main.js"' + '<' + '/script>');
        }
    }
};
</script>