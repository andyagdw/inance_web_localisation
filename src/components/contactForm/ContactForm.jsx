// React
import { useRef, useState } from "react"
// Firebase
import { firestore } from "../../firebase"
import { doc, getDoc } from "firebase/firestore"
// Utils
import { manageSendMessage } from "../../utils/firebaseUtils"
// React toastify
import { toast, ToastContainer } from "react-toastify"
// Constants
import {
  PHONEREGEXPATTERN,
  EMAILREGEXPATTERN,
} from "../../constants/Constants"

const phonePattern = new RegExp(PHONEREGEXPATTERN)
const emailPattern = new RegExp(EMAILREGEXPATTERN)

export default function ContactForm({ styles, t, i18n }) {
  const formRef = useRef()
  const textAreaRef = useRef()

  const [name, setName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [formHasBeenSubmitted, setFormHasBeenSubmitted] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    // Check if firebase object is not empty (i.e., user has set up firebase)
    if (!firestore) {
      alert("Sorry, messaging is currently unavailable. Please set up a Firebase project to continue.")
      return;
    }
    // Get data
    const formData = new FormData(formRef.current)
    const userName = formData.get("name").trim()
    const userPhoneNumber = formData.get("phone-number").trim()
    const userEmail = formData.get("email").trim()
    const userMessage = formData.get("message").trim()

    // Check if any fields are empty
    if (!userName || !userPhoneNumber || !userEmail || !userMessage) {
      toast.error(t("emptyFields"))
      setFormHasBeenSubmitted(true)
      return
    }
    // Check if input fields meet criteria
    if (
      !phonePattern.test(userPhoneNumber) ||
      !emailPattern.test(userEmail) ||
      userMessage.length < textAreaRef.current.minLength
    ) {
      setFormHasBeenSubmitted(true)
      return
    }

    // Get document reference
    const docRef = doc(firestore, "users", userEmail)
    const docSnap = await getDoc(docRef)

    manageSendMessage(
      t,
      docSnap,
      docRef,
      userName,
      userPhoneNumber,
      userEmail,
      userMessage
    )

    // Reset fields and form state
    setName("")
    setPhoneNumber("")
    setEmail("")
    setMessage("")
    setFormHasBeenSubmitted(false)
  }

  return (
    <>
      <form
        aria-label="Contact"
        onSubmit={handleSubmit}
        ref={formRef}
        noValidate
      >
        <div>
          <input
            type="text"
            placeholder={t("namePlaceholder")}
            className={styles.input}
            aria-label="Name"
            id="name"
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        {formHasBeenSubmitted && !name.trim() && (
          <p className={styles.error}>{t("fieldMissing")}</p>
        )}
        <div>
          {/* Override the default behaviour here depending on writing mode */}
          <input
            type="tel"
            inputMode="tel"
            pattern={PHONEREGEXPATTERN}
            dir={i18n.dir() === "ltr" ? "ltr" : "rtl"}
            placeholder={t("phonePlaceholder")}
            className={styles.input}
            aria-label="Phone Number"
            id="phone-number"
            name="phone-number"
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        {formHasBeenSubmitted && !phonePattern.test(phoneNumber.trim()) && (
          <p className={styles.error}>{t("phonePatternMessage")}</p>
        )}
        <div>
          <input
            type="email"
            inputMode="email"
            pattern={EMAILREGEXPATTERN}
            placeholder={t("emailPlaceholder")}
            className={styles.input}
            aria-label="Email"
            id="email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        {formHasBeenSubmitted && !emailPattern.test(email.trim()) && (
          <p className={styles.error}>{t("emailPatternMessage")}</p>
        )}
        <div>
          <textarea
            name="message"
            ref={textAreaRef}
            placeholder={t("messagePlaceholder")}
            id="message"
            className={styles.messageBox}
            aria-label="message"
            value={message}
            minLength={100}
            onChange={e => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
        {formHasBeenSubmitted &&
          message.trim().length < textAreaRef.current.minLength && (
            <p className={styles.error}>
              {t("textAreaMessage", {
                minlength: textAreaRef.current.minLength,
                characters: textAreaRef.current.value.length,
              })}
            </p>
          )}
        <div className="d-flex">
          <button className={styles.sendBtn} type="submit">
            {t("sendButtonText")}
          </button>
        </div>
      </form>
      <ToastContainer rtl={i18n.dir() === "rtl"} stacked />
    </>
  )
}
