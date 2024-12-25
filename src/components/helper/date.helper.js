import { Timestamp } from "firebase/firestore";

export const parseDate = (inDate) => {
    const timestamp = new Timestamp(inDate.seconds, inDate.nanoseconds);
    const date = timestamp.toDate();
    return new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}