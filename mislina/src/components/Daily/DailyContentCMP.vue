<template>
    <div class="container p-4">
        <div class="row">
            <div class="col-12 col-md-6 ">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#"><i class="fa-solid fa-house"></i></a></li>
                        <li class="breadcrumb-item cursor-pointer" @click="$router.push('/DailyView')"><a>Günlük</a>
                        </li>
                        <li class="breadcrumb-item active">Günlük Görüntüleme</li>
                    </ol>
                </nav>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6 card plan">
                <h2 class="text-center">Günlük Detayları</h2>
                <div class="mb-3">
                    <label class="form-label">
                        <p class="fw-bold">Başlık</p>
                    </label>
                    <h6>{{ formData.title }}</h6>
                </div>
                <div class="mb-3">
                    <label class="form-label">
                        <p class="fw-bold ">İçerik</p>
                    </label>
                    <h6 class="description">{{ formData.description }}</h6>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { DB } from "@/firebase/configs";
import { doc, getDoc } from "firebase/firestore";
import { reactive } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const formData = reactive({
    title: '',
    description: ''
});

const docRef = doc(DB, "dailys", route.params.id);
getDoc(docRef).then(snapshot => {
    formData.title = snapshot.data().title;
    formData.description = snapshot.data().description;
}).catch(error => {
    console.log(error);
});
</script>

<style scoped>
.plan {
    padding: 20px;
    border-radius: 15px;
    max-width: 600px;
    box-shadow: rgba(33, 151, 58, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
    color: rgb(11, 126, 36);
}

textarea {
    width: 100%;
}

.btn {
    padding: 10px;
    background: #03530b;
    color: white;
}

.btn:hover {
    background: #03530b4f
}

.cursor-pointer:hover {
    cursor: pointer;
}

.description {
    background: rgb(100, 219, 126);
    padding: 10px;
    border-radius: 0.2cm;
    color: white;
}

@media (max-width: 768px) {

    .plan {
        max-width: 100%;
    }
}
</style>
