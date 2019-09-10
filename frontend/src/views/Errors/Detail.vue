<template>
  <Container>
    <Modal :text="text" />
  </Container>
</template>

<script>
import Modal from "@/components/Modal";
import Container from "@/components/Container";

export default {
  data() {
    return {
      text: "fsjdfusndfdshfnshdfshdfnb"
    };
  },
  components: {
    Modal,
    Container
  }
};
</script>