<!-- Show the modal if the page visit count is 0 -->
<template>
    <div class="card flex justify-content-center">
        <!-- <Button label="Show" icon="pi pi-external-link" @click="visible = true" /> -->
        <!-- eslint-disable-next-line -->
        <Dialog v-model:visible="visible" header="Owlsight Script" :style="{ width: '50vw' }">
            <p>
                Install this script in your body tag on your website 
                &lt;script src="https://owlsight.onrender.com/main.js">&lt;/script&gt;
            </p>
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
    }
};
</script>