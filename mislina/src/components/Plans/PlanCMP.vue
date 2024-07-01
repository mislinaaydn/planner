<template>
    <div class="container p-4">
        <div class="row">
            <div class="col-12 col-md-6">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#"><i class="fa-solid fa-house"></i></a></li>
                        <li class="breadcrumb-item active" aria-current="page">Planlar</li>
                    </ol>
                </nav>
            </div>
            <div class="col-12 offset-md-5 col-md-1 justify-content-center p-2">
                <div class="add">
                    <i class="fa-solid fa-plus fa-xl text-white"><router-link
                            :to="`/PlanAddView`">Ekle</router-link></i>
                </div>
            </div>
        </div>
    </div>
    <div class="col-12 d-flex justify-content-center mb-3">
        <h3 class="section-title">Planlarım</h3>
    </div>

    <div class="container">
        <div class="row">
            <div class="col-md-8 col-12 offset-md-2 offset-0" v-for="plan in plans" :key="plan.id">
                <div class="card">
                    <div class="card-header">
                        <div class="row">
                            <div class="col-4">{{ plan.title }}</div>
                            <div class="col-8 justify-content-end d-flex">
                                <router-link :to="`/PlanUpdateView/${plan.id}`">
                                    <button type="button" class="btn left btn-primary btn-sm">
                                        <i class="fa-solid fa-pencil"></i>
                                    </button>
                                </router-link>
                                <button type="button" class="btn left btn-primary btn-sm" @click="deletePlan(plan.id)">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="p-3">{{ plan.description }}</div>
                    <div class="p-3 justify-content-end d-flex">{{ formatTimestamp(plan.timestamp) }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { DB } from '@/firebase/configs.js';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ref } from 'vue';

const plans = ref([]);
const plansCollection = collection(DB, 'plans');

const fetchPlans = async () => {
    const snapShot = await getDocs(plansCollection);
    let documents = [];
    snapShot.docs.forEach(doc => {
        let data = doc.data();
        data.timestamp = data.timestamp ? data.timestamp.toDate() : null;
        documents.push({ ...data, id: doc.id });
    });
    plans.value = documents;
};

fetchPlans();

const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    return timestamp.toLocaleString('tr-TR', { dateStyle: 'medium', timeStyle: 'short' });
};

const deletePlan = async (id) => {
    await deleteDoc(doc(DB, 'plans', id));
    fetchPlans(); // Refresh the list after deletion
};
</script>

<style>
.breadcrumb {
    background: none;
}

.left {
    width: 30px;
    height: 30px;
    margin-right: 10px;
}

.right {
    width: 30px;
    height: 30px;
    margin-right: 10px;
}

.buttons {
    justify-content: end;
    display: flex;
}

.card-body {
    max-height: 200px;
    height: 60px;
    overflow-y: auto;
    padding: 15px;
}

.section-title {
    text-shadow: 2px 2px 2px rgb(15, 205, 113);
    color: rgb(15, 205, 113);
    border-bottom: 2px solid;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

.card {
    margin: 15px;
    justify-content: center;
    display: flex;
    background: #dbeadf;
    border: 2px solid #dbeae0cb;
    box-shadow: rgba(33, 151, 58, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
}

.add {
    font-size: 10px;
    font-weight: bold;
    background: rgb(15, 205, 113);
    align-items: center;
    justify-content: center;
    display: flex;
    padding: 8px;
    height: 45px;
    border-radius: 20px;
}

.add i {
    margin-right: 5px;
}

.add a {
    color: white !important;
    text-decoration: none !important;
}

.add a:hover {
    color: rgb(115, 227, 173) !important;
}

i:hover {
    color: rgb(115, 227, 173) !important;
}

h3 {
    color: rgb(15, 205, 113);
    border-bottom: 2px solid;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
</style>
