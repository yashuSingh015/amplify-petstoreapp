import logo from './logo.svg';
import './App.css';
import { Pets } from './ui-components';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { generateClient } from 'aws-amplify/api';
import { Pet } from './models';
import { DataStore } from '@aws-amplify/datastore';
import { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import { listPets } from './graphql/queries';
import {
  createPet as createPetMutation,
  deletePet as deletePetMutation,
} from './graphql/mutations';
import { onCreatePet, onDeletePet } from './graphql/subscriptions';

const client = generateClient();

function App() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    fetchPets();
    const subscription = DataStore.observe(Pet).subscribe(() => fetchPets());
    return () => subscription.unsubscribe();
  }, []);

  async function fetchPets() {
    const pets = await DataStore.query(Pet);
    setPets(pets);
  }

  async function createPet() {
    const pet = {
      name: 'Fido',
      breed: 'Golden Retriever',
      age: 3,
      about: 'A',
      color: 'Golden',
      image:
        'https://images.dog.ceo/breeds/retriever-golden/n02099601_1305.jpg',
      rating: 5,
    };

    await DataStore.save(new Pet(pet));
  }

  async function deletePet() {
    const toDelete = pets[0];
    await DataStore.delete(toDelete);
  }

  async function updatePet() {
    const toUpdate = pets[0];
    await DataStore.save(
      Pet.copyOf(toUpdate, (updated) => {
        updated.name = 'Rex';
      })
    );
  }

  async function listPets() {
    const apiData = await API.graphql({ query: listPets });
    const petsFromAPI = apiData.data.listPets.items;
    setPets(petsFromAPI);
  }

  async function createPet() {
    const pet = {
      name: 'Fido',
      breed: 'Golden Retriever',
      age: 3,
      about: 'A',
      color: 'Golden',
      image:
        'https://images.dog.ceo/breeds/retriever-golden/n02099601_1305.jpg',
      rating: 5,
    };
    await API.graphql({ query: createPetMutation, variables: { input: pet } });
  }

  async function deletePet() {
    const toDelete = pets[0];
    await API.graphql({
      query: deletePetMutation,
      variables: { input: { id: toDelete.id } },
    });
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Amplify Pets</h1>
        <h2>GraphQL</h2>
        <h3>Queries</h3>
        <button onClick={listPets}>List Pets</button>
        <h3>Subscriptions</h3>
        <button onClick={onCreatePet}>On Create Pet</button>
        <button onClick={onDeletePet}>On Delete Pet</button>
        <h2>DataStore</h2>
        <h3>Queries</h3>
        <button onClick={listPets}>List Pets</button>
        <h3>Subscriptions</h3>
        <button onClick={onCreatePet}>On Create Pet</button>
        <button onClick={onDeletePet}>On Delete Pet</button>
        <h2>API</h2>
        <h3>Queries</h3>
        <button onClick={listPets}>List Pets</button>

        <h3>Mutations</h3>
        <button onClick={createPet}>Create Pet</button>
        <button onClick={deletePet}>Delete Pet</button>
        <button onClick={updatePet}>Update Pet</button>

        <Pets
          pets={[]}
          onCreatePet={createPet}
          onDeletePet={deletePet}
          onUpdatePet={updatePet}
        />
      </header>
    </div>
  );
}

export default withAuthenticator(App);
