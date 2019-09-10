<template>
  <b-card-group deck>
    <b-card bg-variant="danger" text-variant="white" header="Detalhes do Log" class="text-center">
      <b-card-text>{{text}}</b-card-text>
    </b-card>
  </b-card-group>
</template>

<script>
export default {
  props: { text: String }
};
</script>