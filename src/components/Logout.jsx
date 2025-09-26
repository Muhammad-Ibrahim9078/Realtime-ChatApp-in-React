import { auth } from "../config/Firebase"; 
import { signOut } from "firebase/auth"; 
import Swal from "sweetalert2";

function Logout() {
  const LogoutBtn = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await signOut(auth);
          Swal.fire("Logged out!", "You have been signed out.", "success");
        } catch (error) {
          Swal.fire("Error!", error.message, "error");
        }
      }
    });
  };

  return (
    <button
      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
      onClick={LogoutBtn}
    >
      Logout
    </button>
  );
}

export default Logout;
