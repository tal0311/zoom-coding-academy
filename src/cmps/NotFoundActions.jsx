import allImg from "../assets/img/notes/all.png"
import myImg from "../assets/img/notes/my.png"
import recentImg from "../assets/img/notes/recent.png"
import sharedImg from "../assets/img/notes/shared.png"
import starImg from "../assets/img/notes/star.png"
import trashImg from "../assets/img/notes/trash.png"


const allNotFoundAction = {
    note: {
        'All notes': {
            img: allImg,
            text1: 'Create a note',
            text2: 'Share and collaborate with others before, during, and after meeting.',
            buttonText: 'New note'
        },
        'Recent': {
            img: recentImg,
            text1: 'Create a note',
            text2: 'Share and collaborate with others before, during, and after meeting.',
            buttonText: 'New note'
        },
        'My notes': {
            img: myImg,
            text1: 'Create Your first note',
            text2: 'Keep it for you or share with your crew!',
            buttonText: 'New note'
        },
        'Shared with me': {
            img: sharedImg,
            text1: 'Did someone say teamwork?',
            text2: 'When a note is shared with you, it will appear here.'
        },
        'Starred': {
            img: starImg,
            text1: 'Give important notes a star',
            text2: 'This will help you find your most important notes later.'
        },
        'Trash': {
            img: trashImg,
            text1: 'Make space for new ideas',
            text2: 'When you remove a note, it will appear here for 30 days.'
        },
    }
};

export function NotFoundActions({ label, operator }) {
    const actionData = allNotFoundAction[operator]?.[label];

    if (!actionData) return null;
    return (
        <article className="not-found-actions justify-center justify-items-center gap-2.5 p-10">
            <img src={actionData.img} alt="" />
            <h1>{actionData.text1}</h1>
            <p>{actionData.text2}</p>
            {actionData.buttonText && <button className="prime-btn">{actionData.buttonText}</button>}
        </article>
    )
}