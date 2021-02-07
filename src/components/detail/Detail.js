import { useEffect, useState } from "react";
import styles from "./detail.module.css";

const Detail = (props) => {
    const [ details, setDetails ] = useState(props.data);

    const handleClick = (passedIndex) => {
        setDetails(details => details.filter((detail, index) => index !== passedIndex));
    };

    useEffect(() => {
        localStorage.setItem("stored", JSON.stringify(details));
    }, [details]);

    return (
        <>
            <div className={styles.detailsContainer}>
                <ul>
                    {details.map((detail, index) => (
                        <li key={index}>
                            <img className={styles.image} src={detail.image} alt="" />
                            <div>
                                <p className={styles.title}>{detail.title}</p>
                                <a className={styles.link} href={detail.link} target="_blank" rel="noreferrer">{detail.link}</a>
                            </div>
                            <button className={styles.deleteButton} type="button" onClick={() => handleClick(index)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
};

export default Detail;