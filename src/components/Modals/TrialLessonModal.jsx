import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AuthModal from "./AuthModal.jsx";
import toast from "react-hot-toast";
import css from "./RegisterModal.module.css"; 

const schema = yup.object({
  reason: yup.string().required("Please choose a reason"),
  fullName: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone number is required"),
});

const REASONS = [
  "Career and business",
  "Lesson for kids",
  "Living abroad",
  "Exams and coursework",
  "Culture, travel or hobby",
];

export default function TrialLessonModal({ teacher, onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      reason: "",
      fullName: "",
      email: "",
      phone: "",
    },
  });

  if (!teacher) return null;

  const onSubmit = async (data) => {
    console.log("Trial lesson booking:", {
      teacherId: teacher.id,
      teacherName: `${teacher.name} ${teacher.surname}`,
      ...data,
    });

    toast.success("Trial lesson successfully booked!");
    reset();
    onClose?.();
  };

  return (
    <AuthModal  onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className={css.modal}>
        <h2 className={css.title}>Book trial lesson</h2>
      <p className={css.text}>
        Our experienced tutor will assess your current language level, discuss
        your learning goals, and tailor the lesson to your specific needs.
      </p>

      <div className={css.teacherRow}>
        <img
          src={teacher.avatar_url}
          alt={`${teacher.name} ${teacher.surname}`}
          width="48"
          height="48"
          className={css.teacherAvatar}
        />
        <div>
          <div className={css.teacherLabel}>Teacher</div>
          <div className={css.teacherName}>
            {teacher.name} {teacher.surname}
          </div>
        </div>
      </div>

      
        <div className={css.reasonBlock}>
          <p className={css.reasonTitle}>
            What is your main reason for learning English?
          </p>

          <div className={css.reasonList}>
            {REASONS.map((option) => (
              <label key={option} className={css.reasonItem}>
                <input type="radio" value={option} {...register("reason")} />
                <span>{option}</span>
              </label>
            ))}
          </div>

          {errors.reason && <div className={css.error}>{errors.reason.message}</div>}
        </div>

        <div className={css.field}>
          <input
            type="text"
            {...register("fullName")}
            className={css.input}
            placeholder=" "
          />
          <label className={css.label}>Full name</label>
          {errors.fullName && <div className={css.error}>{errors.fullName.message}</div>}
        </div>

        <div className={css.field}>
          <input
            type="email"
            {...register("email")}
            className={css.input}
            placeholder=" "
          />
          <label className={css.label}>Email</label>
          {errors.email && <div className={css.error}>{errors.email.message}</div>}
        </div>

        <div className={css.field}>
          <input
            type="tel"
            {...register("phone")}
            className={css.input}
            placeholder=" "
          />
          <label className={css.label}>Phone number</label>
          {errors.phone && <div className={css.error}>{errors.phone.message}</div>}
        </div>

        <button type="submit" disabled={isSubmitting} className={css.submit}>
          {isSubmitting ? "Booking..." : "Book"}
        </button>
      </form>
    </AuthModal>
  );
}