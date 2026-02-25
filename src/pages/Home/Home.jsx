import { useNavigate } from "react-router-dom";
import css from "./Home.module.css";
import block from "../../image/block.jpg";


export default function Home() {
    const navigate = useNavigate();
    return (
        <section className={css.blockHome} >
            <div className={css.home} >
                <div className={css.block}>
                    <h1 className={css.titel}>Unlock your potential with the best <span className={css.text}>language</span> tutors</h1>
                    <p className={css.subTitel}>Embark on an Exciting Language Journey with Expert Language Tutors: Elevate your language proficiency to new heights by connecting with highly qualified and experienced tutors.</p>
                    <button className={css.button} onClick={() => navigate("/teachers")}>Get started</button>
                </div>
                <div>
                    <img src={block} alt="image" />
                </div>
            </div>
            <div className={css.stats}>
                <div className={css.statsGrid}>
                    <div className={css.statItem}>
                        <h2 className={css.statNumber}>32,00+</h2>
                        <p className={css.statLabel}>Experienced tutors</p>
                    </div>
                    <div className={css.statItem}>
                        <h2 className={css.statNumber}>300,00+</h2>
                        <p className={css.statLabel}>5-star tutor reviews</p>
                    </div>
                    <div className={css.statItem}>
                        <h2 className={css.statNumber}>120+</h2>
                        <p className={css.statLabel}>Subjects taught</p>
                    </div>
                    <div className={css.statItem}>
                        <h2 className={css.statNumber}>200+</h2>
                        <p className={css.statLabel}>Tutor nationalities</p>
                    </div>
                </div>
            </div>
        </section>
    );
}