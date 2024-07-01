import { ref } from "vue";
import { auth } from "../firebase/configs";
import { onAuthStateChanged } from "firebase/auth";

const kullanici = ref(auth.currentUser);

onAuthStateChanged(auth, (k) => {
  kullanici.value = k;
});
const getUser = () => {
  return { kullanici };
};
export default getUser;
