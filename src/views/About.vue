<template>
  <div class="about">
    <h1>This is an about page</h1>
    <ol>
      <li v-for="course in courses" :key="course.id">{{ course.title }}</li>
    </ol>
    <br>
    <h1>Add Item</h1>
    <form @submit.prevent="addItem">
      <label for="title">Title</label>
      <input type="text" id="title" name="title" v-model="addedItem"><br>
      <button>Add Item</button>
    </form>
    <h1>Update Item</h1>
    <form @submit.prevent="updateItem">
      <label for="newtitle">New Title</label>
      <input type="text" id="newtitle" name="newtitle" v-model="newTitle"><br>
      <label for="itemid">Item ID</label>
      <input type="number" id="itemid" name="itemid" v-model="choosenId"><br>
      <button>Update Item</button>
    </form>
    <h1>Delete Item</h1>
    <form @submit.prevent="deleteItem">
      <label for="idtodelete">Item ID</label>
      <input type="number" id="idtodelete" name="idtodelete" v-model="idToDelete"><br>
      <button>Delete Item</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      courses: [],
      addedItem: '',
      newTitle: '',
      choosenId: '',
      idToDelete: ''
    }
  },
  created() {
    //GET
    /*
    this.$axios.get(`${process.env.VUE_APP_API_COLLECTION_URL}chapter${process.env.VUE_APP_API_TOKEN_PARAM}`)
        .then(response => {
          this.courses = response.data.data;
        })
     */
    //GET mit Header
    const headers = {
      "Authorization": "Bearer ggF45!2jHimMs21"
    };
    this.$axios.get(`${process.env.VUE_APP_API_COLLECTION_URL}chapter`, { headers })
      .then(response => {
        this.courses = response.data.data;
      })
  },
  methods: {
    //POST
    addItem() {
      const posttest = {
        title: this.addedItem
      }
      this.$axios.post(`${process.env.VUE_APP_API_COLLECTION_URL}posttest${process.env.VUE_APP_API_TOKEN_PARAM}`, posttest)
          .then(response => {
            console.log(response)
          })
    },
    //PATCH
    updateItem() {
      if (this.newTitle && this.choosenId) {
        const content = {
          title: this.newTitle
        }
        this.$axios.patch(`${process.env.VUE_APP_API_COLLECTION_URL}posttest/${this.choosenId}${process.env.VUE_APP_API_TOKEN_PARAM}`, content)
            .then(response => {
              console.log(response)
            })
      }
    },
    //DELETE
    deleteItem(){
      if(this.idToDelete){
        this.$axios.delete(`${process.env.VUE_APP_API_COLLECTION_URL}posttest/${this.idToDelete}${process.env.VUE_APP_API_TOKEN_PARAM}`)
          .then(response => {
            console.log(response)
          })
      }
    }
  }
}
</script>
