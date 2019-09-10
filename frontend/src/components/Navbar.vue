<template>
  <div>
    <b-navbar toggleable="lg">
      <b-navbar-brand :to="{name: 'home'}">
        <img
          src="https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/spaces%2F-LEkNWEp1f8V1WZ92tOa%2Favatar.png?generation=1560536151068541&alt=media"
          class="d-inline-block align-top"
          alt="Logo"
          height="30"
          width="30"
        />
        SquadNation
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse" />

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item :to="{name: 'register'}">Cadastrar-se</b-nav-item>
          <b-nav-item :to="{name: 'login'}">Entrar</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<style scoped>
a {
  color: black !important;
  font-size: 20px;
}
</style>