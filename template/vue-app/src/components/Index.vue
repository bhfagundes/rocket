<template>
  <div>
  <b-card no-body>
    <b-tabs pills card vertical>
      <b-tab title="Tasks" active></b-tab>
      <b-tab title="Content"></b-tab>
      <b-tab title="Setup">
        Setup
        <div>
          <b-tabs content-class="mt-3">
            <b-tab title="Minha Equipe" active>
              <b-container class="bv-example-row">
                <b-row>
                  <b-col>
                    <mdb-input label="Digite uma palavra-chave e tecle enter para buscar" />
                  </b-col>
                  <b-col>
                  <div>
                    <b-form inline>
                      <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
                        <label class="mr-sm-2" for="inlineFormCustomSelectPref">Visualizar:</label>
                        <b-form-radio-group
                            id="btnradios2"
                            buttons
                            button-variant="outline-primary"
                            size="sm"
                            v-model="selected"
                            :options="options"
                            name="radioBtnOutline"
                        />
                      </b-input-group>
                      <mdb-input label="Material input" />
                      <b-button variant="success" size="sm">Novo Membro</b-button>
                    </b-form>
                  </div>
                  </b-col>
                </b-row>
            </b-container>
            </b-tab>
            <b-tab title="Tab Item">I'm the second tab content</b-tab>
            <b-tab title="Tab Item">I'm the third tab content</b-tab>
          </b-tabs>
        </div>
      </b-tab>
    </b-tabs>
  </b-card>
</div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      selected: 'freelas',
      options: [
        {text: 'Freelas', value: 'freelas'},
        {text: 'Usuários', value: 'usuarios'}
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
