<template>
    <div class="container p-4">
        <div class="row">
            <div class="col-12 col-md-6">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#"><i class="fa-solid fa-house"></i></a></li>
                        <li class="breadcrumb-item cursor-pointer" @click="$router.push('/PersonView')">kişi</li>
                        <li class="breadcrumb-item active"> ekleme</li>
                    </ol>
                </nav>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="plan card">
                    <h2 class="text-center"> Ekleme</h2>
                    <form @submit.prevent="submitForm">
                        <div class="mb-3">
                            <label class="form-label">Adı</label>
                            <input type="text" class="form-control" v-model="formData.name">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Soyisim</label>
                            <input type="text" class="form-control" v-model="formData.surname">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Telefon Numarası</label>
                            <input type="text" class="form-control" v-model="formData.phoneNumber">
                        </div>


                        <div class="mb-3">
                            <label class="form-label">Yakınlık</label>
                            <input type="text" class="form-control" v-model="formData.proximity">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Doğum tarihi</label>
                            <input type="date" class="form-control" v-model="formData.personBirth">
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Bilgiler </label>
                            <input type="text" class="form-control" v-model="formData.personMemory">
                        </div>
                        <div class="col-12 justify-content-end d-flex">
                            <button type="submit" class="btn">Ekle</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { DB } from '@/firebase/configs';
import { collection, addDoc } from 'firebase/firestore';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const formData = reactive({
    name: '',
    surname: '',
    phoneNumber: '',
    personMemory: '',
    proximity: '',
    personBirth: '',


});

const submitForm = async () => {
    const personCollection = collection(DB, 'persons');
    await addDoc(personCollection, {

        name: formData.name,
        surname: formData.surname,
        phoneNumber: formData.phoneNumber,

        personMemory: formData.personMemory,
        proximity: formData.proximity,
        personBirth: formData.personBirth,
    });

    formData.name = '';
    formData.surname = '';
    formData.phoneNumber = '';

    formData.personMemory = '';
    formData.proximity = '';
    formData.personBirth = '';

    router.push('/PersonView');
};
</script>

<style>
.plan {
    padding: 20px;
    border-radius: 15px;
    max-width: 600px;
    border: 2px solid #dbeae0cb;
    box-shadow: rgba(33, 151, 58, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
    color: rgb(11, 126, 36);
}

.cursor-pointer:hover {
    cursor: pointer;
}

.btn {
    padding: 10px;
    background: #03530b !important;
    color: white !important;
}

.btn:hover {
    background: #03530b4f !important;
    color: #03530b !important;
}

@media (max-width: 768px) {
    .plan {
        max-width: 100%;
    }
}
</style>
