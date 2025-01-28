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
    },
    wb: {
        'All whiteboards': {
            img: allImg,
            text1: 'Create a whiteboards',
            text2: 'Share and collaborate with others before, during, and after meeting.',
            buttonText: 'New whiteboards'
        },
        'Recent': {
            img: recentImg,
            text1: 'Create a whiteboards',
            text2: 'Share and collaborate with others before, during, and after meeting.',
            buttonText: 'New whiteboards'
        },
        'My whiteboards': {
            img: myImg,
            text1: 'Create Your first whiteboards',
            text2: 'Keep it for you or share with your crew!',
            buttonText: 'New whiteboards'
        },
        'Shared with me': {
            img: sharedImg,
            text1: 'Did someone say teamwork?',
            text2: 'When a whiteboards is shared with you, it will appear here.'
        },
        'Starred': {
            img: starImg,
            text1: 'Give important whiteboards a star',
            text2: 'This will help you find your most important whiteboards later.'
        },
        'Trash': {
            img: trashImg,
            text1: 'Sometimes it`s nice to clear out and mack some space for new ideas',
            text2: 'When you remove a whiteboards, it will appear here for 30 days.'
        },
    },
};

export function NotFoundActions({ label, operator, CBF }) {
    const actionData = allNotFoundAction[operator]?.[label];

    if (!actionData) return null;
    return (
        <article className="not-found-actions justify-center justify-items-center gap-2.5 p-10">
            {actionData.img && <img src={actionData.img} alt="" />}
            {actionData.text1 && <h1>{actionData.text1}</h1>}
            {actionData.text2 && <p>{actionData.text2}</p>}
            {actionData.buttonText && <button className="prime-btn" onClick={CBF}>{actionData.buttonText}</button>}
        </article>
    )
}