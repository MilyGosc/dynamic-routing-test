import { useRouter } from 'next/router'
import styles from '../../styles/people.module.css'

export async function getStaticProps({ params }) {
    let rawPerson = await fetch("https://swapi.dev/api/people/" + params.id);
    let person = await rawPerson.json();

    return {
        props: {
            person: person
        },
        revalidate: 20
    }
}

export async function getStaticPaths() {
    const paths = [];

    return { paths, fallback: true }
}

export default function Person({ person }) {
    const router = useRouter()

    if (router.isFallback) {
        return <div className={styles.container}>Loading...</div>
    }

    return (
        <div className={styles.container}>
            <div >Name: {person.name}</div>
            <div>Birth year: {person.birth_year}</div>
            <div>Gender: {person.gender}</div>
        </div>
    )
}