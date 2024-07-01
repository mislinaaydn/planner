<template>
    <div class="container p-4">
        <div class="row mb-3">
            <div class="col-12 col-md-6">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <router-link to="/"><i class="fa-solid fa-house"></i></router-link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">Kişilerim</li>
                    </ol>
                </nav>
            </div>
            <div class="col-12 col-md-6 d-flex justify-content-end align-items-center">
                <router-link :to="`/PersonAddView`" class="btn btn-success text-white">
                    <i class="fa-solid fa-plus fa-xl me-2"></i> Yeni Kişi Ekle
                </router-link>
            </div>
        </div>
        <div class="row">
            <div class="col-12 d-flex justify-content-center mt-3">
                <h3 class="section-title">Kişilerim</h3>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="row">
            <div class="col-md-8 col-12 offset-md-2 offset-0 " v-for="person in persons" :key="person.id">
                <div class="card">
                    <div class="card-header">
                        <div class="row">
                            <div class="col-4 d-flex justify-content-center align-items-center">
                                <img src="../../assets/cherry.png" alt="Kişi Resmi" class="person-image img-fluid">
                            </div>
                            <div class="col-8">
                                <p><strong>İsim:</strong> {{ person.name }}</p>
                                <p><strong>Soyisim:</strong> {{ person.surname }}</p>
                                <p><strong>Telefon numarası:</strong> {{ person.phoneNumber }}</p>
                                <p><strong>Doğum Tarihi:</strong> {{ person.personBirth }}</p>
                                <p><strong>Yakınlık:</strong> {{ person.proximity }}</p>
                            </div>
                            <div class="col-12 mb-3 justify-content-end d-flex"><button type="submit"
                                    class="btn rightupdate" @click="deleteperson">SİL</button></div>
                            <div class="collapse" :id="'collapse-' + person.id"></div>
                            <div class="col-12 d-flex justify-content-end">
                                <button class="btn btn-primary" type="button" data-bs-toggle="collapse"
                                    :data-bs-target="'#collapse-' + person.id" aria-expanded="false"
                                    aria-controls="collapseExample">
                                    Hakkında Göster
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <p><strong>Hakkında:</strong> {{ person.personMemory }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { DB } from '@/firebase/configs.js';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ref } from 'vue'; import { useRouter, useRoute } from 'vue-router'; const router = useRouter();
const route = useRoute();


const persons = ref([]);
const personCollection = collection(DB, 'persons');

getDocs(personCollection).then(snapShot => {
    let documents = [];
    snapShot.docs.forEach(doc => {
        documents.push({ ...doc.data(), id: doc.id });
    });
    persons.value = documents;
});

const deleteperson = async () => {
    try {
        const docRef = doc(DB, "persons", route.params.id);
        await deleteDoc(docRef);
        router.push('/PersonView');
    } catch (error) {
        console.log(error);
    }
};
</script>

<style>
.card {
    margin-bottom: 20px;
    padding: 30px;
    color: rgb(11, 126, 36);
    border-radius: 10px;
}

p {
    font-weight: bold;
}

.person-image {
    width: 100px;

    height: 100px;

    border-radius: 50%;
    object-fit: cover;

}
</style>
