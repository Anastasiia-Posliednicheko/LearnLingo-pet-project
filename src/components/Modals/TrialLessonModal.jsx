import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AuthModal from "./AuthModal.jsx";
import toast from "react-hot-toast";

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
    <AuthModal title="Book trial lesson" onClose={onClose}>
      <p style={{ marginBottom: 16 }}>
        Our experienced tutor will assess your current language level, discuss
        your learning goals, and tailor the lesson to your specific needs.
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <img
          src={teacher.avatar_url}
          alt={`${teacher.name} ${teacher.surname}`}
          width="48"
          height="48"
          style={{ borderRadius: "50%", objectFit: "cover" }}
        />
        <div>
          <div style={{ fontSize: 12, opacity: 0.7 }}>Teacher</div>
          <div style={{ fontWeight: 600 }}>
            {teacher.name} {teacher.surname}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: 16 }}>
          <p style={{ marginBottom: 8 }}>
            What is your main reason for learning English?
          </p>
          <div style={{ display: "grid", gap: 4 }}>
            {REASONS.map((option) => (
              <label key={option} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input
                  type="radio"
                  value={option}
                  {...register("reason")}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
          {errors.reason && (
            <div style={{ color: "crimson", fontSize: 12, marginTop: 4 }}>
              {errors.reason.message}
            </div>
          )}
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", marginBottom: 4 }}>Full name</label>
          <input
            type="text"
            {...register("fullName")}
            style={{ width: "100%", padding: 8, boxSizing: "border-box" }}
          />
          {errors.fullName && (
            <div style={{ color: "crimson", fontSize: 12 }}>
              {errors.fullName.message}
            </div>
          )}
              </div>
              
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", marginBottom: 4 }}>Email</label>
          <input
            type="email"
            {...register("email")}
            style={{ width: "100%", padding: 8, boxSizing: "border-box" }}
          />
          {errors.email && (
            <div style={{ color: "crimson", fontSize: 12 }}>
              {errors.email.message}
            </div>
          )}
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", marginBottom: 4 }}>Phone number</label>
          <input
            type="tel"
            {...register("phone")}
            style={{ width: "100%", padding: 8, boxSizing: "border-box" }}
          />
          {errors.phone && (
            <div style={{ color: "crimson", fontSize: 12 }}>
              {errors.phone.message}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: "8px 16px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          {isSubmitting ? "Booking..." : "Book"}
        </button>
      </form>
    </AuthModal>
  );
}
