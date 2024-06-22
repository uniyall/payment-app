import { atom, selector } from "recoil";
import { useLocalStorage } from "../../utils/useLocalStorage";

// Custom localStorage effect with synchronization
const localStorageEffect =
  (key) =>
  ({ setSelf, onSet }) => {
    console.log("jgdhgh");
    // Initialize state from localStorage if available
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue).username);
    }

    // Define event listener for storage events
    const handleStorageChange = (event) => {
      console.log("event ");
      if (event.key === key) {
        if (event.newValue != null) {
          setSelf(JSON.parse(event.newValue).username);
        } else {
          setSelf(null);
        }
      }
    };

    // Add the storage event listener
    window.addEventListener("storage", handleStorageChange);

    // Update localStorage whenever the atom state changes
    onSet((newValue) => {
      if (newValue != null) {
        localStorage.setItem(key, JSON.stringify(newValue));
      } else {
        localStorage.removeItem(key);
      }
    });

    // Cleanup the event listener when the atom is no longer used
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  };

const userAtom = atom({
  key: "userAtom",
  default: null,
});

export default userAtom;
