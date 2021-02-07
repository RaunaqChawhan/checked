import { useState, useRef, useEffect } from "react";
import Detail from "../detail/Detail";
import styles from "./saveUrl.module.css";

const SaveUrl = () => {
    const [ url, setUrl ] = useState("");
    const [disabled, setDisabled ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ save, setSave ] = useState(false);
    const data = useRef([]);

    const loadDetails = async () => {
        const finalUrl = "https://serene-cliffs-67615.herokuapp.com/" + url;
        try {
            const response = await fetch(finalUrl);
            const text = await response.text();
            const parser = new DOMParser();
            const xml = parser.parseFromString(text, "text/html");
            const head = xml.getElementsByTagName("head")[0];
            const link = head.querySelector("meta[property='og:url']")?.getAttribute("content") || url;
            const image = head.querySelector("meta[property='og:image']")?.getAttribute("content") 
            || "https://fakeimg.pl/350x200/?text=:)";
            const title = head.querySelector("title")?.innerHTML 
            || head.querySelector("meta[property='og:title']")?.getAttribute("content") 
            || "";
            data.current.unshift({ title, link, image });
            localStorage.setItem('stored', JSON.stringify(data.current));
            setLoading(true);
            setUrl("");
            setDisabled(false);
            setSave(false);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setDisabled(true);
        setSave(true);
        loadDetails();
    };

    useEffect(() => {
        const storedData = localStorage.getItem('stored');
        if(storedData) {
            data.current = JSON.parse(storedData);
            setLoading(true);
        }
    }, []);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.icon}>✔</div>
                <h1>Checked</h1>
            </header>
            <div className={styles.urlContainer}>
                <form onSubmit={handleSubmit}>
                    <input className={styles.input} type="url" placeholder="enter the url" value={url} onChange={(event) => setUrl(event.target.value)} required/>
                    <button className={styles.submitButton} type="submit" disabled={disabled}>
                        {save ? "Saving..." : "Save Link"}
                    </button>
                </form>
            </div>
            {loading ? <Detail data={data.current} /> : null}
        </div>
    )
};

export default SaveUrl;