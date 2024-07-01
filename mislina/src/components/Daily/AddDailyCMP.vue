<template>
    <div class="container p-4">
        <div class="row">
            <div class="col-12 col-md-6">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#"><i class="fa-solid fa-house"></i></a></li>
                        <li class="breadcrumb-item cursor-pointer" @click="$router.push('/DailyView')">Günlüğüm</li>
                        <li class="breadcrumb-item active">Günlük ekleme</li>
                    </ol>
                </nav>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="plan card">
                    <h2 class="text-center">Günlük Ekleme</h2>
                    <form @submit.prevent="submitForm">
                        <div class="mb-3">
                            <label class="form-label">Başlık</label>
                            <input type="text" class="form-control" v-model="formData.title">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">İçerik</label>
                            <input type="text" class="form-control" v-model="formData.description">
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
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const formData = reactive({
    title: '',
    description: ''
});

const submitForm = async () => {
    const dailysCollection = collection(DB, 'dailys');
    await addDoc(dailysCollection, {
        title: formData.title,
        description: formData.description,
        timestamp: serverTimestamp()
    });

    formData.title = '';
    formData.description = '';

    router.push('/DailyView');
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

.h2 {
    text-shadow: 2px 2px 2px rgb(15, 205, 113);
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
