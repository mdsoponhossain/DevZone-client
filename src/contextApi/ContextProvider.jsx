import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/Firebase";

export const Context = createContext(null)
const ContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [homedata, setHomedata] = useState([]);
    const [search, setSearch] = useState('')
    const [dbUser, setDbUser] = useState('')
    const [totalBlogs, setTotalBlogs] = useState(0);
    const [isloading, setIsloading] = useState(true);
    // sidebar searching data:
    const [textSearch, setTextSearch] = useState('')
    const [navData, setNavData] = useState([''])

    // for the pagination.
    const [pageNumber, setPageNumber] = useState(0)
    const signupWithEmail = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    };


    const updateUserProfile = (userInfo) => {
        return updateProfile(auth.currentUser, userInfo)
    };


    // for making a function into a title case;
    function toTitleCase(str) {
        return str.replace(
            /\w\S*/g,
            function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        )
    }
    // for making into a sentence case ;
    function toSentenceCase(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    function convertUTCtoLocal(utcDateString) {
        const utcTime = new Date(utcDateString);
        const localTime = utcTime.toLocaleString();
        return localTime;
    }
    const hanldeLogin = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    
// For caching the user using the firebase;
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        })
    }, []);
    const handleLogout = () => {
        return signOut(auth);
    }



// For loading the homepage left side navigations;
    useEffect(() => {
        // fetch(`http://localhost:5000/docs/aggregation/docs?searchText=${textSearch}`, {
        fetch(`https://syntax-high-lighter-server.vercel.app/docs/aggregation/docs?searchText=${textSearch}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then(res => res.json())
            .then(data => { setNavData(data); setIsloading(false) })
    }, [textSearch]);





// For loading the homepage contents;
    useEffect(() => {
        // fetch(`http://localhost:5000/docs/all?searchText=${search}&pageNumber=${pageNumber}`, {
        fetch(`https://syntax-high-lighter-server.vercel.app/docs/all?searchText=${search}&pageNumber=${pageNumber}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then(res => res.json())
            .then(data => { setHomedata(data?.result); setTotalBlogs(data?.totalBlog); setIsloading(false) })
    }, [search, pageNumber]);



// For loading the user for conditional routings;
    useEffect(() => {
        if (user?.email) {
            // fetch(`http://localhost:5000/users/user?email=${user?.email}`, {
            fetch(`https://syntax-high-lighter-server.vercel.app/users/user?email=${user?.email}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                },
            })
                .then(res => res.json())
                .then(data => { setDbUser(data); setIsloading(false) })
        }
    }, [user?.email]);



    const authInfo = {
        signupWithEmail,
        user,
        handleLogout,
        setSearch,
        homedata,
        updateUserProfile,
        dbUser,
        hanldeLogin,
        navData,
        setTextSearch,
        toTitleCase,
        toSentenceCase,
        setPageNumber,
        pageNumber,
        totalBlogs,
        convertUTCtoLocal,
        isloading
    }


    return (
        <Context.Provider value={authInfo}>
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;