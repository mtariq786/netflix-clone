import React,{useState,useEffect} from 'react'
import './Nav.css'


function Nav() {

    const [show,handleShow] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll",() =>{
            if(window.scrollY > 100){
                handleShow(true);
            }else handleShow(false);
        })
        return () => {
            window.removeEventListener("scroll");
        }
    }, [])
    return (
        <div className={`nav ${show && "nav_black"}`}>
            <img
            className="nav_logo"
            src="https://a0.muscache.com/pictures/af0e863b-4c8a-42f5-a8d2-7618eabced4b.jpg"
            alt="Logo"
            />
            <img
            className="nav_avatar"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQNIBcPE-hDiaOZSXriV4gIVqB_D5UiaM_QYQ&usqp=CAU"
            alt="Avatar"
            />
            
        </div>
    )
}

export default Nav
