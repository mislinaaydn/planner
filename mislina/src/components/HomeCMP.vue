<template>
    <div class="container">
        <div class="row">
            <div class="col-12 col-md-6">
                <div class="baslik">
                    <h1 class="animate__animated animate__fadeInLeft">CHERİSH'e Hoşgeldin</h1>
                    <br>
                    <p class="animate__animated animate__fadeInTopLeft">Bu uygulama ile gününü planlayabilir</p>
                    <p class="animate__animated animate__fadeInRight">Anılarını saklayabilir</p>
                    <p class="animate__animated animate__fadeInLeft">Görevlerini takip edebilir</p>

                    <p class="animate__animated animate__fadeInTopLeft">ve kişilerin ile hatıralarını saklayabilirsin
                    </p>


                </div>

            </div>
            <div class="col-12 col-md-6 justify-content-center d-flex mt-4">
                <img src="../assets/cc.png" class="img-fluid" alt="resim">
            </div>
        </div>
    </div>

</template>

<script setup>
</script>

<style>
html,
body {
    height: 100%;
    margin: 0;
    padding: 0;
}

body {
    background: rgba(214, 250, 223, 0.637);
    background-size: cover;
    background-repeat: no-repeat;
    color: rgba(7, 50, 12, 0.705);
}

.baslik {
    margin-top: 15%;
    font-family: "Alkatra", system-ui;
    font-optical-sizing: auto;
    font-style: normal;
    padding: 30px;

}

.baslik p {
    font-size: 20px;
    animation-duration: 3s;
}

.img-fluid {
    width: 350px;
}
</style>
