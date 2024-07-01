<template>
    <div class="container p-4">
        <div class="row align-items-center">
            <div class="col-12 col-md-6">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <router-link to="/">
                                <i class="fa-solid fa-house"></i>
                            </router-link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">Günlük</li>
                    </ol>
                </nav>
            </div>
            <div class="col-12 col-md-6 d-flex justify-content-end align-items-center">
                <router-link :to="`/DailyAddView`" class="btn btn-success text-white">
                    <i class="fa-solid fa-plus fa-xl me-2"></i> Yeni Günlük Ekle
                </router-link>
            </div>
        </div>

        <div class="col-12 d-flex justify-content-center mb-3">
            <h3 class="section-title">Günlüklerim</h3>
        </div>

        <div class="container mt-4">
            <div class="row">
                <div class="col-md-6 col-12" v-for="daily in dailys" :key="daily.id">
                    <div class="card">
                        <div class="card-header d-flex justify-content-between align-items-center">
                            <div class="card-title">{{ daily.title }}</div>
                            <div>
                                <router-link :to="`/DailyContentView/${daily.id}`" class="btn btn-sm btn-primary me-2">
                                    Ayrıntı gör
                                </router-link>
                                <button type="button" class="btn btn-sm btn-danger" @click="deleteDaily(daily.id)">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        </div>
                        <div class="card-body">
                            <p>{{ daily.description }}</p>
                        </div>
                        <div class="card-footer text-end">
                            {{ formatTimestamp(daily.timestamp) }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { DB } from '@/firebase/configs.js';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ref } from 'vue';

const dailys = ref([]);
const dailysCollection = collection(DB, 'dailys');

const fetchDaily = async () => {
    const snapShot = await getDocs(dailysCollection);
    const documents = snapShot.docs.map(doc => {
        const data = doc.data();
        return {
            ...data,
            id: doc.id,
            timestamp: data.timestamp ? data.timestamp.toDate() : null
        };
    });
    dailys.value = documents;
};

const formatTimestamp = timestamp => {
    if (!timestamp) return '';
    return timestamp.toLocaleString('tr-TR', {
        dateStyle: 'medium',
        timeStyle: 'short'
    });
};

const deleteDaily = async id => {
    await deleteDoc(doc(DB, 'dailys', id));
    fetchDaily();
};

fetchDaily();
</script>

<style scoped>
.breadcrumb {
    background: none;
    padding: 0;
    margin-bottom: 1rem;
}

.btn-add {
    background-color: rgb(15, 205, 113);
    color: white;
    display: flex;
    align-items: center;
    border-radius: 20px;
    padding: 8px 16px;
    text-decoration: none;
    font-weight: bold;
    transition: background-color 0.3s;
}

.btn-add:hover {
    background-color: rgb(115, 227, 173);
}

h3 {
    color: rgb(15, 205, 113);
    border: none;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

.card {
    margin: 15px 0;
    background: rgba(79, 232, 89, 0.478);
    border: 2px solid #dbeae0cb;
    box-shadow: rgba(33, 151, 58, 0.1) 0px 4px 16px,
        rgba(17, 17, 26, 0.1) 0px 8px 24px,
        rgba(17, 17, 26, 0.1) 0px 16px 56px;
}

.section-title {
    text-shadow: 2px 2px 2px rgb(15, 205, 113);
    color: rgb(15, 205, 113);
    border-bottom: 2px solid;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

.card-header {
    background-color: #f8f9fa;
    border-bottom: 1px solid #dbeae0cb;
    padding: 10px 15px;
}

.card-title {
    font-size: 1.25rem;
    font-weight: bold;
}

.card-body {
    max-height: 150px;
    overflow-y: auto;
    padding: 15px;
}

.card-footer {
    background-color: #f8f9fa;
    border-top: 1px solid #dbeae0cb;
    padding: 10px 15px;
}

.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 0.875rem;
    font-weight: 600;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    text-decoration: none;
    transition: background-color 0.3s;
}

.btn-primary {
    background-color: #007bff;
    color: white;
}

.btn-primary:hover {
    background-color: #0056b3;
}

.btn-danger {
    background-color: #dc3545;
    color: white;
}

.btn-danger:hover {
    background-color: #c82333;
}
</style>
