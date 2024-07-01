<template>
    <header>
        <nav class="navbar navbar-dark  fixed-top">
            <div class="container p-0 ">
                <div class="col-1 justify-content-start d-flex p-0 m-0">
                    <button v-show="kullanici" type="button" class="custom-toggle-btn" data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar"
                        aria-label="Toggle navigation">
                        <i class="fa-solid fa-bars fa-xl"></i>
                    </button>
                    <div class="offcanvas offcanvas-start text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar"
                        aria-labelledby="offcanvasDarkNavbarLabel">
                        <div class="offcanvas-header justify-content-center d-flex">
                            <h5 class="offcanvas-title " id="offcanvasDarkNavbarLabel">
                            </h5>
                        </div>
                        <div class="offcanvas-body">
                            <ul class="navbar-nav justify-content-center flex-grow-1 pe-3 text-white">
                                <li class="nav-item">
                                    <a class="nav-link" href="#"><i class="fa-solid fa-home fa-xs"></i> Anasayfa</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/#/PlanView">
                                        <i class="fa-solid fa-thumbtack"></i> Plan</a>
                                </li>

                                <li class="nav-item">
                                    <a class="nav-link" href="/#/NoteView"><i class="fa-regular fa-note-sticky"></i>
                                        Notlar</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/#/PersonView"><i class="fa-solid fa-users"></i>
                                        Kişiler</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/#/DailyView"><i class="fa-solid fa-book-open-reader"></i>
                                        Günlük</a>
                                </li>

                            </ul>

                        </div>
                    </div>
                </div>

                <div class="col-10 justify-content-center d-flex  mt-2">


                    <a class="navbar-brand " href="#">Cherish</a>
                </div>
                <div class=" col-1 justify-content-end d-flex mt-3">
                    <router-link to="/LoginView" v-show="!kullanici" class="register ">Giriş</router-link>
                    <p class="register" v-show="kullanici" @click="handleCikis">çıkış</p>


                </div>
            </div>

        </nav>
    </header>

</template>
<style>
.offcanvas-backdrop.show {
    opacity: 0 !important;
}

.offcanvas-backdrop.fade {
    opacity: 0 !important;
}

.offcanvas.show,
.offcanvas.showing {
    visibility: visible;
    width: 130px !important;
    font-family: 'Courier New', Courier, monospace;

}

.navbar-brand {
    font-size: 35px !important;
    font-family: "Satisfy", cursive;

}

header nav {
    background: rgb(15, 205, 113);
    background: linear-gradient(84deg, rgb(109, 231, 158) 0%, rgb(148, 239, 191) 53%);
    position: relative;
    box-shadow: rgba(33, 151, 58, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
}

.offcanvas {
    background: rgb(15, 205, 113);
    background: linear-gradient(84deg, rgb(109, 231, 158) 0%, rgb(148, 239, 191) 53%);
    border-radius: none;


}

.register {
    background: rgb(15, 205, 113);
    padding: 8px;
    color: wheat;
    border: none;
    text-decoration: none;
    border-radius: 8px;
    text-shadow: rgba(33, 151, 58, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;

}

.register:hover {
    background: red;
    padding: 8px;
    border: none;
    color: wheat;
    border-radius: 8px;
    transition: 3ms;
    text-shadow: rgba(33, 151, 58, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
}


#offcanvasNavbar a {
    color: wheat;
    font-size: 20px;
}

#offcanvasNavbar {
    color: white;
}

.custom-toggle-btn {
    background: none;
    border: none;
}

.fixed-top {
    position: relative !important;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1030;
}

.custom-toggle-btn .fa-bars {
    color: white;
}

.custom-toggle-btn .fa-bars :hover {
    border: none;
}

.custom-toggle-btn :hover {
    background: none;
    border: none;
}

#offcanvasNavbar :hover {
    color: white;
    border: none;
}

.nav-link {
    color: rgb(21, 130, 70) !important;
    font-size: 13px !important;
    font-weight: bold;
    line-height: 30px !important;
    text-decoration: none !important;
}

.nav-item :hover {
    color: rgb(255, 255, 255) !important;
    font-size: 13px !important;
    font-weight: bold;
    line-height: 30px !important;
}

.offcanvas-title {
    font-size: 20px;
}
</style>
<script>
import getUser from '@/composables/getUser';
import { auth } from '../firebase/configs'
import { signOut } from 'firebase/auth'
import { useRouter } from 'vue-router';

export default {
    setup() {

        const { kullanici } = getUser();

        const router = useRouter();

        const handleCikis = async () => {

            await signOut(auth);

            router.push({ name: 'LoginCMP' })
        }
        return { kullanici, handleCikis }
    },

}

</script>