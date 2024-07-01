<script setup>
import { DB } from '@/firebase/configs.js';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ref } from 'vue';

const notes = ref([]);
const notesCollection = collection(DB, 'notes');

const fetchNotes = async () => {
    const snapShot = await getDocs(notesCollection);
    let documents = [];
    snapShot.docs.forEach(doc => {
        let data = doc.data();
        data.timestamp = data.timestamp ? data.timestamp.toDate() : null;
        documents.push({ ...data, id: doc.id });
    });
    notes.value = documents;
};

fetchNotes();

const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    return timestamp.toLocaleString('tr-TR', { dateStyle: 'medium', timeStyle: 'short' });
};

const deleteNote = async (id) => {
    await deleteDoc(doc(DB, 'notes', id));
    fetchNotes();
};
</script>

<template>
    <div class="container p-4">
        <div class="row mb-3">
            <div class="col-12 col-md-6">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <router-link to="/"><i class="fa-solid fa-house"></i></router-link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">Notlar</li>
                    </ol>
                </nav>
            </div>
            <div class="col-12 col-md-6 d-flex justify-content-end align-items-center">
                <router-link :to="`/NoteAddView`" class="btn btn-success text-white">
                    <i class="fa-solid fa-plus fa-xl me-2"></i> Yeni Not Ekle
                </router-link>
            </div>
        </div>

        <div class="col-12 d-flex justify-content-center mb-3">
            <h3 class="section-title">Notlarım</h3>
        </div>

        <div class="row">
            <div class="col-md-4 col-12" v-for="note in notes" :key="note.id">
                <div class="card note-card">
                    <div class="card-header d-flex justify-content-between">
                        <div class="note-title">{{ note.title }}</div>
                        <div>
                            <router-link :to="`/NoteUpdateView/${note.id}`" class="btn btn-primary btn-sm me-1">
                                <i class="fa-solid fa-pencil"></i>
                            </router-link>
                            <button type="button" class="btn btn-danger btn-sm" @click="deleteNote(note.id)">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <p>{{ note.description }}</p>
                    </div>
                    <div class="card-footer text-end">
                        {{ formatTimestamp(note.timestamp) }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.breadcrumb {
    background: none;
    padding: 0;
    margin-bottom: 1rem;
}

.section-title {
    text-shadow: 2px 2px 2px rgb(15, 205, 113);
    color: rgb(15, 205, 113);
    border-bottom: 2px solid;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

.btn-success {
    background: rgb(15, 205, 113);
    border: none;
    padding: 8px 12px;
    border-radius: 20px;
    display: flex;
    align-items: center;
}

.btn-success:hover {
    background: rgb(12, 174, 96);
}

.note-card {
    margin-bottom: 15px;
    background: #dbeadf;
    border: 2px solid #dbeae0cb;
    box-shadow: rgba(33, 151, 58, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
}

.note-card .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    border-bottom: 1px solid #e0e0e0;
}

.note-title {
    font-weight: bold;
}

.card-body {
    max-height: 200px;
    overflow-y: auto;
    padding: 15px;
}

.card-footer {
    background: none;
    border-top: none;
    text-align: right;
    font-size: 0.9em;
    color: #666;
}
</style>
