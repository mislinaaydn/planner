<template>
    <main class="form-signin m-auto w-10">
        <div class="row">
            <div class="col-12 justify-content-center d-flex">
                <div class="card">
                    <div class="card-body text-center">
                        <h5 class="card-title">Google ile Giriş Yap</h5>
                        <p class="card-text">Hesabınıza Google ile giriş yapın.</p>
                        <button @click="handleLogin" class="btn btn-primary">
                            <i class="fa-brands fa-google"></i> Google ile Giriş Yap
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import { auth } from "../firebase/configs"
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const router = useRouter()

        const handleLogin = () => {
            const provider = new GoogleAuthProvider()

            signInWithPopup(auth, provider)
                .then(sonuc => {
                    console.log(sonuc)
                    // Giriş yapıldıktan sonra ana sayfaya yönlendirme
                    router.push('/')
                })
                .catch(error => {
                    console.error('Google ile giriş yaparken hata oluştu:', error)
                })
        }

        return { handleLogin }
    },
}
</script>

<style>
.card {
    margin-top: 50px;
    height: 200px;
    /* Sabit bir yükseklik verildi */
    overflow: hidden;
    /* İçerik taşarsa gizle */
}

.card-body {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>
