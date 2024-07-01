<template>
    <div class="container p-4">
        <div class="row">
            <div class="col-12 col-md-6 ">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#"><i class="fa-solid fa-house"></i></a></li>
                        <li class="breadcrumb-item cursor-pointer" @click="$router.push('/PlanView')"><a></a>Planlar
                        </li>
                        <li class="breadcrumb-item active">Plan güncelle</li>
                    </ol>

                </nav>
            </div>

        </div>
    </div>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6 card plan">
                <h2 class="text-center">Plan Güncelleme</h2>
                <form @submit.prevent="submitForm">
                    <div class="mb-3">
                        <label class="form-label">Başlık</label>
                        <textarea type="text" v-model="formData.title"></textarea>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">İçerik</label>
                        <textarea type="text" v-model="formData.description"></textarea>
                    </div>
                    <div class="col-12 justify-content-end d-flex">
                        <button type="submit" class="btn ">EKLE</button>
                        <button type="submit" class="btn rightupdate" @click="deletenote">SİL</button>
                    </div>
                </form>
            </div>

        </div>
    </div>
</template>

<script setup>
import { DB } from "@/firebase/configs";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const formData = reactive({
    title: '',
    description: ''
});

const docRef = doc(DB, "plans", route.params.id);
getDoc(docRef).then(snapshot => {
    formData.title = snapshot.data().title;
    formData.description = snapshot.data().description;
}).catch(error => {
    console.log(error);
});

const submitForm = async () => {
    try {
        const docRef = doc(DB, "plans", route.params.id);
        await updateDoc(docRef, { ...formData });
        router.push('/PlanView');
    } catch (error) {
        console.log(error);
    }
};

const deletenote = async () => {
    try {
        const docRef = doc(DB, "plans", route.params.id);
        await deleteDoc(docRef);
        router.push('/PlanView');
    } catch (error) {
        console.log(error);
    }
};
</script>

<style scoped>
.plan {
    padding: 20px;
    border-radius: 15px;
    max-width: 600px;
    box-shadow: rgba(33, 151, 58, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
    color: rgb(11, 126, 36);

}

.rightupdate {
    margin-left: 10px;
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

@media (max-width: 768px) {

    .plan {
        max-width: 100%;
    }
}
</style>
