<template>
  <div>
    <!-- Section de création -->
    <div>
      <input v-model="itemData.name" placeholder="Item name" />
      <button @click="createItem">Create Item</button>
    </div>

    <!-- Liste des items -->
    <ol>
      <li v-for="item in items" :key="item._id">
        {{ item.name }}
        <button @click="editItem(item)">Edit</button>
        <button @click="deleteItem(item._id)">Delete</button>
      </li>
    </ol>

    <!-- Détails et mise à jour de l'item sélectionné -->
    <div v-if="selectedItem">
      <input v-model="selectedItem.name" placeholder="Item name" />
      <button @click="updateItem(selectedItem._id)">Update Item</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import axios from 'axios'

interface Item {
  _id: string
  name: string
}

export default defineComponent({
  setup() {
    const itemData = ref({ name: '' })
    const items = ref<Item[]>([])
    const selectedItem = ref<Item | null>(null)

    const createItem = async () => {
      try {
        const response = await axios.post(
          'http://localhost:7512/testindex/testcollection/_create',
          itemData.value
        )
        console.log(response.data)
        const newItem = { ...itemData.value, _id: response.data.result._id } // Créer un nouvel objet item
        items.value.push(newItem) // Ajouter le nouvel item à la liste
        itemData.value.name = '' // Réinitialiser le champ de saisie
      } catch (error) {
        console.error(error)
      }
    }

    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:7512/testindex/testcollection/_search')
        items.value = response.data.result.hits.map((hit: any) => hit._source)
      } catch (error) {
        console.error(error)
      }
    }

    const editItem = (item: Item) => {
      selectedItem.value = { ...item }
    }

    const updateItem = async (id: string) => {
      try {
        await axios.put(`http://localhost:7512/testindex/testcollection/${id}/_update`, {
          changes: selectedItem.value
        })
        fetchItems() // Mise à jour de la liste des items
        selectedItem.value = null // Réinitialiser l'item sélectionné
      } catch (error) {
        console.error(error)
      }
    }

    const deleteItem = async (id: string) => {
      try {
        await axios.delete(`http://localhost:7512/testindex/testcollection/${id}`)
        fetchItems() // Mise à jour de la liste des items
      } catch (error) {
        console.error(error)
      }
    }

    return {
      itemData,
      items,
      selectedItem,
      createItem,
      fetchItems,
      editItem,
      updateItem,
      deleteItem
    }
  },
  async created() {
    await this.fetchItems()
  }
})
</script>
